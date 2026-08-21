package com.lostfound.service;

import com.lostfound.dto.ClaimRequestDTO;
import com.lostfound.dto.ClaimResponseDTO;
import com.lostfound.dto.ItemResponseDTO;
import com.lostfound.entity.Claim;
import com.lostfound.entity.Item;
import com.lostfound.entity.User;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ClaimService(ClaimRepository claimRepository,
                        ItemRepository itemRepository,
                        UserRepository userRepository) {
        this.claimRepository = claimRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ClaimResponseDTO submitClaim(ClaimRequestDTO request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userEmail));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("Item not found: " + request.getItemId()));

        if ("CLAIMED".equalsIgnoreCase(item.getStatus()) || "RETURNED".equalsIgnoreCase(item.getStatus())) {
            throw new IllegalStateException("Item '" + item.getItemId() + "' is already " + item.getStatus());
        }

        if (claimRepository.existsByUserIdAndItemId(user.getUserId(), item.getItemId())) {
            throw new IllegalStateException("You have already submitted a claim for item '" + item.getItemId() + "'");
        }

        Claim claim = new Claim(item.getItemId(), user.getUserId(), request.getNote());
        Claim saved = claimRepository.save(claim);

        return enrichClaimResponse(saved, user, item);
    }

    public List<ClaimResponseDTO> getMyClaims(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userEmail));

        return claimRepository.findByUserIdOrderByCreatedAtDesc(user.getUserId()).stream()
                .map(claim -> {
                    Item item = itemRepository.findById(claim.getItemId()).orElse(null);
                    return enrichClaimResponse(claim, user, item);
                })
                .collect(Collectors.toList());
    }

    public List<ClaimResponseDTO> getAllClaims() {
        return claimRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(claim -> {
                    User user = userRepository.findById(claim.getUserId()).orElse(null);
                    Item item = itemRepository.findById(claim.getItemId()).orElse(null);
                    return enrichClaimResponse(claim, user, item);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public ClaimResponseDTO updateClaimStatus(Long claimId, String status) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new IllegalArgumentException("Claim not found: " + claimId));

        String newStatus = status.toUpperCase();
        claim.setStatus(newStatus);
        Claim saved = claimRepository.save(claim);

        // If approved, automatically update item status to CLAIMED
        if ("APPROVED".equals(newStatus)) {
            Item item = itemRepository.findById(claim.getItemId()).orElse(null);
            if (item != null) {
                item.setStatus("CLAIMED");
                itemRepository.save(item);
            }
        }

        User user = userRepository.findById(saved.getUserId()).orElse(null);
        Item item = itemRepository.findById(saved.getItemId()).orElse(null);

        return enrichClaimResponse(saved, user, item);
    }

    private ClaimResponseDTO enrichClaimResponse(Claim claim, User user, Item item) {
        ClaimResponseDTO dto = new ClaimResponseDTO(claim);
        if (user != null) {
            dto.setClaimantName(user.getName());
            dto.setClaimantEmail(user.getEmail());
            dto.setClaimantPhone(user.getPhone());
        }
        if (item != null) {
            dto.setItem(new ItemResponseDTO(item));
        }
        return dto;
    }
}

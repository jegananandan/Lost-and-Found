package com.lostfound.service;

import com.lostfound.dto.AdminDashboardStatsDTO;
import com.lostfound.dto.UserDTO;
import com.lostfound.entity.Item;
import com.lostfound.entity.User;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final ClaimRepository claimRepository;

    public AdminService(UserRepository userRepository,
                        ItemRepository itemRepository,
                        ClaimRepository claimRepository) {
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.claimRepository = claimRepository;
    }

    public AdminDashboardStatsDTO getDashboardStats() {
        AdminDashboardStatsDTO stats = new AdminDashboardStatsDTO();

        stats.setTotalUsers(userRepository.count());
        stats.setTotalLostItems(itemRepository.countByType("LOST"));
        stats.setTotalFoundItems(itemRepository.countByType("FOUND"));
        stats.setActiveItems(itemRepository.countByStatus("ACTIVE"));
        stats.setPendingClaims(claimRepository.countByStatus("PENDING"));
        stats.setApprovedClaims(claimRepository.countByStatus("APPROVED"));
        stats.setSuccessfulReturns(itemRepository.countByStatus("RETURNED"));

        List<Item> allItems = itemRepository.findAll();

        Map<String, Long> categoryMap = new HashMap<>();
        Map<String, Long> locationMap = new HashMap<>();

        for (Item item : allItems) {
            categoryMap.put(item.getCategory(), categoryMap.getOrDefault(item.getCategory(), 0L) + 1);
            locationMap.put(item.getLocation(), locationMap.getOrDefault(item.getLocation(), 0L) + 1);
        }

        stats.setItemsByCategory(categoryMap);
        stats.setItemsByLocation(locationMap);

        return stats;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO toggleUserActiveStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setActive(!user.getActive());
        User saved = userRepository.save(user);
        return new UserDTO(saved);
    }

    @Transactional
    public UserDTO updateUserRole(Long userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setRole(role.toUpperCase());
        User saved = userRepository.save(user);
        return new UserDTO(saved);
    }
}

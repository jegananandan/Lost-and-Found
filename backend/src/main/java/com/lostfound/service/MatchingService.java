package com.lostfound.service;

import com.lostfound.dto.ItemResponseDTO;
import com.lostfound.dto.MatchResultDTO;
import com.lostfound.entity.Item;
import com.lostfound.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Smart Lost / Found Matching Engine.
 * Converted and preserved from the original Java console application.
 *
 * Scoring Weights:
 *   - Name:        40% (0.40)
 *   - Category:    25% (0.25)
 *   - Location:    20% (0.20)
 *   - Description: 15% (0.15)
 *
 * Algorithm:
 *   - Category match: 1.0 if exact case-insensitive match, 0.0 otherwise.
 *   - Token similarity (Jaccard): |intersection| / |union| for Name, Location, Description.
 *   - Returns matches with score >= 30%.
 */
@Service
public class MatchingService {

    private static final int THRESHOLD = 30; // Minimum match % to return

    private static final double WEIGHT_NAME     = 0.40;
    private static final double WEIGHT_CATEGORY = 0.25;
    private static final double WEIGHT_LOCATION = 0.20;
    private static final double WEIGHT_DESC     = 0.15;

    private final ItemRepository itemRepository;

    public MatchingService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<MatchResultDTO> findMatches(String itemId) {
        Item targetItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with ID: " + itemId));

        // Determine opposite type
        String oppositeType = "LOST".equalsIgnoreCase(targetItem.getType()) ? "FOUND" : "LOST";

        List<Item> candidates = itemRepository.findByTypeAndStatus(oppositeType, "ACTIVE");

        List<MatchResultDTO> results = new ArrayList<>();
        ItemResponseDTO targetDTO = new ItemResponseDTO(targetItem);

        for (Item candidate : candidates) {
            int score = computeScore(targetItem, candidate);
            if (score >= THRESHOLD) {
                ItemResponseDTO candidateDTO = new ItemResponseDTO(candidate);
                if ("LOST".equalsIgnoreCase(targetItem.getType())) {
                    results.add(new MatchResultDTO(targetDTO, candidateDTO, score));
                } else {
                    results.add(new MatchResultDTO(candidateDTO, targetDTO, score));
                }
            }
        }

        // Sort descending by score
        return results.stream()
                .sorted((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()))
                .collect(Collectors.toList());
    }

    public int computeScore(Item item1, Item item2) {
        double nameScore     = tokenSimilarity(item1.getName(),        item2.getName())        * 100;
        double categoryScore = categoryMatch(item1.getCategory(),      item2.getCategory())    * 100;
        double locationScore = tokenSimilarity(item1.getLocation(),   item2.getLocation())    * 100;
        double descScore     = tokenSimilarity(item1.getDescription(), item2.getDescription()) * 100;

        double weighted = (nameScore     * WEIGHT_NAME)
                        + (categoryScore * WEIGHT_CATEGORY)
                        + (locationScore * WEIGHT_LOCATION)
                        + (descScore     * WEIGHT_DESC);

        return (int) Math.round(weighted);
    }

    private double categoryMatch(String a, String b) {
        if (a == null || b == null) return 0.0;
        return a.equalsIgnoreCase(b) ? 1.0 : 0.0;
    }

    private double tokenSimilarity(String a, String b) {
        if (a == null || b == null || a.trim().isEmpty() || b.trim().isEmpty()) return 0.0;

        Set<String> tokensA = tokenize(a);
        Set<String> tokensB = tokenize(b);

        if (tokensA.isEmpty() || tokensB.isEmpty()) return 0.0;

        Set<String> intersection = new HashSet<>(tokensA);
        intersection.retainAll(tokensB);

        Set<String> union = new HashSet<>(tokensA);
        union.addAll(tokensB);

        if (union.isEmpty()) return 0.0;
        return (double) intersection.size() / union.size();
    }

    private Set<String> tokenize(String text) {
        Set<String> tokens = new HashSet<>();
        if (text == null) return tokens;
        String[] words = text.toLowerCase().split("[^a-z0-9]+");
        for (String w : words) {
            if (!w.isEmpty() && w.length() > 1) {
                tokens.add(w);
            }
        }
        return tokens;
    }
}

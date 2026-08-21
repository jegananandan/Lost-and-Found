package com.lostfound.dto;

public class MatchResultDTO {
    private ItemResponseDTO lostItem;
    private ItemResponseDTO foundItem;
    private int matchScore; // Percentage 0 - 100
    private String matchLabel; // High Potential Match, Medium Match, etc.

    public MatchResultDTO() {}

    public MatchResultDTO(ItemResponseDTO lostItem, ItemResponseDTO foundItem, int matchScore) {
        this.lostItem = lostItem;
        this.foundItem = foundItem;
        this.matchScore = matchScore;
        if (matchScore >= 80) {
            this.matchLabel = "High Match";
        } else if (matchScore >= 50) {
            this.matchLabel = "Moderate Match";
        } else {
            this.matchLabel = "Potential Match";
        }
    }

    public ItemResponseDTO getLostItem() { return lostItem; }
    public void setLostItem(ItemResponseDTO lostItem) { this.lostItem = lostItem; }

    public ItemResponseDTO getFoundItem() { return foundItem; }
    public void setFoundItem(ItemResponseDTO foundItem) { this.foundItem = foundItem; }

    public int getMatchScore() { return matchScore; }
    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }

    public String getMatchLabel() { return matchLabel; }
    public void setMatchLabel(String matchLabel) { this.matchLabel = matchLabel; }
}

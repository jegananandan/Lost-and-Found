package com.lostfound.dto;

import jakarta.validation.constraints.NotBlank;

public class ClaimRequestDTO {

    @NotBlank(message = "Item ID is required")
    private String itemId;

    private String note;

    public ClaimRequestDTO() {}

    public ClaimRequestDTO(String itemId, String note) {
        this.itemId = itemId;
        this.note = note;
    }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}

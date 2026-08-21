package com.lostfound.dto;

import com.lostfound.entity.Claim;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ClaimResponseDTO {
    private Long claimId;
    private String itemId;
    private Long userId;
    private String claimantName;
    private String claimantEmail;
    private String claimantPhone;
    private ItemResponseDTO item;
    private LocalDate claimDate;
    private String status;
    private String note;
    private LocalDateTime createdAt;

    public ClaimResponseDTO() {}

    public ClaimResponseDTO(Claim claim) {
        this.claimId = claim.getClaimId();
        this.itemId = claim.getItemId();
        this.userId = claim.getUserId();
        this.claimDate = claim.getClaimDate();
        this.status = claim.getStatus();
        this.note = claim.getNote();
        this.createdAt = claim.getCreatedAt();
    }

    public Long getClaimId() { return claimId; }
    public void setClaimId(Long claimId) { this.claimId = claimId; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getClaimantName() { return claimantName; }
    public void setClaimantName(String claimantName) { this.claimantName = claimantName; }

    public String getClaimantEmail() { return claimantEmail; }
    public void setClaimantEmail(String claimantEmail) { this.claimantEmail = claimantEmail; }

    public String getClaimantPhone() { return claimantPhone; }
    public void setClaimantPhone(String claimantPhone) { this.claimantPhone = claimantPhone; }

    public ItemResponseDTO getItem() { return item; }
    public void setItem(ItemResponseDTO item) { this.item = item; }

    public LocalDate getClaimDate() { return claimDate; }
    public void setClaimDate(LocalDate claimDate) { this.claimDate = claimDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

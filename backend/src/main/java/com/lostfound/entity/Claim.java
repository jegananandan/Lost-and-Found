package com.lostfound.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "claimId")
    private Long claimId;

    @Column(name = "itemId", nullable = false, length = 20)
    private String itemId;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "claimDate", nullable = false)
    private LocalDate claimDate = LocalDate.now();

    @Column(name = "status", nullable = false, length = 20)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Claim() {}

    public Claim(String itemId, Long userId, String note) {
        this.itemId = itemId;
        this.userId = userId;
        this.note = note;
        this.claimDate = LocalDate.now();
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    public Long getClaimId() { return claimId; }
    public void setClaimId(Long claimId) { this.claimId = claimId; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDate getClaimDate() { return claimDate; }
    public void setClaimDate(LocalDate claimDate) { this.claimDate = claimDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

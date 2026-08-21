package com.lostfound.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @Column(name = "itemId", length = 20)
    private String itemId;

    @Column(name = "type", nullable = false, length = 10)
    private String type; // "LOST" or "FOUND"

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "location", nullable = false, length = 200)
    private String location;

    @Column(name = "reportedDate", nullable = false)
    private LocalDate reportedDate;

    @Column(name = "reporterName", nullable = false, length = 100)
    private String reporterName;

    @Column(name = "reporterContact", nullable = false, length = 15)
    private String reporterContact;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ACTIVE"; // ACTIVE, CLAIMED, RETURNED, CLOSED

    @Column(name = "userId")
    private Long userId; // FK → users.userId

    @Column(name = "extraField1", length = 200)
    private String extraField1; // LOST: lastSeenLocation | FOUND: foundLocation

    @Column(name = "extraField2", length = 200)
    private String extraField2; // LOST: reward           | FOUND: storedAt

    @Column(name = "imageUrl", columnDefinition = "LONGTEXT")
    private String imageUrl; // Optional base64 or photo URL

    @Column(name = "createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Item() {}

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getReportedDate() { return reportedDate; }
    public void setReportedDate(LocalDate reportedDate) { this.reportedDate = reportedDate; }

    public String getReporterName() { return reporterName; }
    public void setReporterName(String reporterName) { this.reporterName = reporterName; }

    public String getReporterContact() { return reporterContact; }
    public void setReporterContact(String reporterContact) { this.reporterContact = reporterContact; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getExtraField1() { return extraField1; }
    public void setExtraField1(String extraField1) { this.extraField1 = extraField1; }

    public String getExtraField2() { return extraField2; }
    public void setExtraField2(String extraField2) { this.extraField2 = extraField2; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

package com.lostfound.dto;

import com.lostfound.entity.Item;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ItemResponseDTO {
    private String itemId;
    private String type;
    private String name;
    private String description;
    private String category;
    private String location;
    private LocalDate reportedDate;
    private String reporterName;
    private String reporterContact;
    private String status;
    private Long userId;
    private String extraField1;
    private String extraField2;
    private String imageUrl;
    private LocalDateTime createdAt;

    public ItemResponseDTO() {}

    public ItemResponseDTO(Item item) {
        this.itemId = item.getItemId();
        this.type = item.getType();
        this.name = item.getName();
        this.description = item.getDescription();
        this.category = item.getCategory();
        this.location = item.getLocation();
        this.reportedDate = item.getReportedDate();
        this.reporterName = item.getReporterName();
        this.reporterContact = item.getReporterContact();
        this.status = item.getStatus();
        this.userId = item.getUserId();
        this.extraField1 = item.getExtraField1();
        this.extraField2 = item.getExtraField2();
        this.imageUrl = item.getImageUrl();
        this.createdAt = item.getCreatedAt();
    }

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

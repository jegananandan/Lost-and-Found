package com.lostfound.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class ItemRequestDTO {

    @NotBlank(message = "Item type (LOST or FOUND) is required")
    private String type;

    @NotBlank(message = "Item name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "General location is required")
    private String location;

    @NotNull(message = "Reported date is required")
    private LocalDate reportedDate;

    @NotBlank(message = "Reporter name is required")
    private String reporterName;

    @NotBlank(message = "Reporter contact is required")
    private String reporterContact;

    // Extra fields
    private String extraField1; // LOST: lastSeenLocation | FOUND: foundLocation
    private String extraField2; // LOST: reward           | FOUND: storedAt
    private String imageUrl;

    public ItemRequestDTO() {}

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

    public String getExtraField1() { return extraField1; }
    public void setExtraField1(String extraField1) { this.extraField1 = extraField1; }

    public String getExtraField2() { return extraField2; }
    public void setExtraField2(String extraField2) { this.extraField2 = extraField2; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

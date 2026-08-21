package com.lostfound.dto;

import java.util.Map;

public class AdminDashboardStatsDTO {
    private long totalUsers;
    private long totalLostItems;
    private long totalFoundItems;
    private long activeItems;
    private long pendingClaims;
    private long approvedClaims;
    private long successfulReturns;
    private Map<String, Long> itemsByCategory;
    private Map<String, Long> itemsByLocation;

    public AdminDashboardStatsDTO() {}

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalLostItems() { return totalLostItems; }
    public void setTotalLostItems(long totalLostItems) { this.totalLostItems = totalLostItems; }

    public long getTotalFoundItems() { return totalFoundItems; }
    public void setTotalFoundItems(long totalFoundItems) { this.totalFoundItems = totalFoundItems; }

    public long getActiveItems() { return activeItems; }
    public void setActiveItems(long activeItems) { this.activeItems = activeItems; }

    public long getPendingClaims() { return pendingClaims; }
    public void setPendingClaims(long pendingClaims) { this.pendingClaims = pendingClaims; }

    public long getApprovedClaims() { return approvedClaims; }
    public void setApprovedClaims(long approvedClaims) { this.approvedClaims = approvedClaims; }

    public long getSuccessfulReturns() { return successfulReturns; }
    public void setSuccessfulReturns(long successfulReturns) { this.successfulReturns = successfulReturns; }

    public Map<String, Long> getItemsByCategory() { return itemsByCategory; }
    public void setItemsByCategory(Map<String, Long> itemsByCategory) { this.itemsByCategory = itemsByCategory; }

    public Map<String, Long> getItemsByLocation() { return itemsByLocation; }
    public void setItemsByLocation(Map<String, Long> itemsByLocation) { this.itemsByLocation = itemsByLocation; }
}

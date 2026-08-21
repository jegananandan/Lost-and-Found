export type UserRole = 'USER' | 'ADMIN';

export interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export type ItemType = 'LOST' | 'FOUND';
export type ItemStatus = 'ACTIVE' | 'CLAIMED' | 'RETURNED' | 'CLOSED';

export interface Item {
  itemId: string;
  type: ItemType;
  name: string;
  description: string;
  category: string;
  location: string;
  reportedDate: string;
  reporterName: string;
  reporterContact: string;
  status: ItemStatus;
  userId?: number;
  extraField1?: string; // LOST: lastSeenLocation | FOUND: foundLocation
  extraField2?: string; // LOST: reward           | FOUND: storedAt
  imageUrl?: string;
  createdAt: string;
}

export type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Claim {
  claimId: number;
  itemId: string;
  userId: number;
  claimantName?: string;
  claimantEmail?: string;
  claimantPhone?: string;
  item?: Item;
  claimDate: string;
  status: ClaimStatus;
  note?: string;
  createdAt: string;
}

export interface MatchResult {
  lostItem: Item;
  foundItem: Item;
  matchScore: number; // 0 - 100
  matchLabel: string; // e.g. "High Match"
}

export interface AdminStats {
  totalUsers: number;
  totalLostItems: number;
  totalFoundItems: number;
  activeItems: number;
  pendingClaims: number;
  approvedClaims: number;
  successfulReturns: number;
  itemsByCategory: Record<string, number>;
  itemsByLocation: Record<string, number>;
}

export interface AuthResponse {
  token: string;
  user: User;
}

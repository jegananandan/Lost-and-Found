import axios from 'axios';
import { AuthResponse, User, Item, Claim, MatchResult, AdminStats } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to append Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('college_lost_found_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: { name: string; email: string; password: string; phone: string; role?: string }) =>
    api.post<AuthResponse>('/auth/register', data),

  getCurrentUser: () =>
    api.get<User>('/auth/me'),
};

export const itemsApi = {
  getAllItems: () =>
    api.get<Item[]>('/items'),

  getItemById: (id: string) =>
    api.get<Item>(`/items/${id}`),

  getItemsByType: (type: 'LOST' | 'FOUND') =>
    api.get<Item[]>(`/items/type/${type}`),

  getMyItems: () =>
    api.get<Item[]>('/items/my'),

  searchItems: (params: { type?: string; category?: string; status?: string; query?: string }) =>
    api.get<Item[]>('/items/search', { params }),

  createItem: (data: Partial<Item>) =>
    api.post<Item>('/items', data),

  updateStatus: (id: string, status: string) =>
    api.put<Item>(`/items/${id}/status`, null, { params: { status } }),

  deleteItem: (id: string) =>
    api.delete(`/items/${id}`),
};

export const matchesApi = {
  getMatches: (lostItemId: string) =>
    api.get<MatchResult[]>(`/matches/${lostItemId}`),
};

export const claimsApi = {
  submitClaim: (data: { itemId: string; note?: string }) =>
    api.post<Claim>('/claims', data),

  getMyClaims: () =>
    api.get<Claim[]>('/claims/my'),

  getAllClaims: () =>
    api.get<Claim[]>('/claims'),

  updateStatus: (claimId: number, status: string) =>
    api.put<Claim>(`/claims/${claimId}/status`, null, { params: { status } }),
};

export const adminApi = {
  getDashboardStats: () =>
    api.get<AdminStats>('/admin/dashboard'),

  getAllUsers: () =>
    api.get<User[]>('/admin/users'),

  toggleUserActive: (userId: number) =>
    api.put<User>(`/admin/users/${userId}/toggle-active`),

  updateUserRole: (userId: number, role: string) =>
    api.put<User>(`/admin/users/${userId}/role`, null, { params: { role } }),

  getAllItems: () =>
    api.get<Item[]>('/admin/items'),

  getAllClaims: () =>
    api.get<Claim[]>('/admin/claims'),

  approveClaim: (claimId: number) =>
    api.put<Claim>(`/admin/claims/${claimId}/approve`),

  rejectClaim: (claimId: number) =>
    api.put<Claim>(`/admin/claims/${claimId}/reject`),
};

export default api;

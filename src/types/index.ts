// NXOLand Backend Types
// Local type definitions for the backend

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
  isVerified: boolean;
  isKycVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
  name: string;
  phone?: string;
}

// Cart DTOs
export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

// Product DTOs
export interface CreateProductDto {
  name?: string; // Backend uses 'name'
  title?: string; // Frontend sends 'title' - will be mapped to 'name'
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  condition: 'NEW' | 'USED' | 'REFURBISHED';
  tags?: string[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  images?: string[];
  condition?: 'NEW' | 'USED' | 'REFURBISHED';
  tags?: string[];
  isActive?: boolean;
}

export interface ProductFiltersDto {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// User DTOs
export interface UpdateUserDto {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// Admin DTOs
export interface CreateAdminDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'admin' | 'moderator' | 'super_admin';
}

export interface AssignRoleDto {
  role: 'admin' | 'moderator' | 'seller' | 'user';
}

export interface AdminStatsDto {
  totalUsers: number;
  activeUsers: number;
  totalAdmins: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalDisputes: number;
  pendingDisputes: number;
  recentUsers: number;
}

// Order DTOs
export interface CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

// Dispute DTOs
export interface CreateDisputeDto {
  orderId: string;
  reason: string;
  description: string;
  evidence?: string[];
}

// Common Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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
  firstName: string;
  lastName: string;
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
  name: string;
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
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// User DTOs
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
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

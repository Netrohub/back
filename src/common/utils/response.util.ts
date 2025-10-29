/**
 * Standardized response utilities for consistent API responses
 */

export interface PaginationMeta {
  page: number;
  limit: number;
  per_page: number; // Backward compatibility
  total: number;
  total_pages: number;
}

export interface StandardResponse<T> {
  data: T;
  pagination?: PaginationMeta;
}

/**
 * Create standardized pagination metadata
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    per_page: limit, // Backward compatibility
    total,
    total_pages: Math.ceil(total / limit),
  };
}

/**
 * Create standardized paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): StandardResponse<T[]> {
  return {
    data,
    pagination: createPaginationMeta(page, limit, total),
  };
}


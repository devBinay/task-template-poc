export interface DirectResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export type Pagination = {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasPreviousPage?: boolean | null;
    hasNextPage?: boolean | null;
}
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
}
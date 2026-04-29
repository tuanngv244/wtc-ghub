/** Generic API envelope returned by all endpoints */
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  requestId: string;
  timestamp: string;
  data: T;
}

/** Paginated response wrapper */
export interface PageResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  data: T[];
}

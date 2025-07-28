export interface SuccessResponse<T> {
  data: T;
  message?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  errors?: Record<string, string[] | undefined>;
}

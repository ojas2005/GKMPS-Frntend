// Every backend endpoint returns this envelope (camelCase on the wire).
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

// Shape of `data` for paginated list endpoints.
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// File downloads (certificates / receipts / report cards) return this, not a file.
export interface DownloadLink {
  downloadUrl: string;
  expiresInMinutes: number;
}

export interface ShortenRequest {
  url: string
  code?: string
}

export interface ShortenResponse {
  shortUrl: string
  code: string
}

export interface ApiError {
  error: string
}

export interface LinkRecord {
  id: number
  code: string
  url: string
  clicks: number
  createdAt: Date
}

export interface HistoryItem {
  shortUrl: string
  originalUrl: string
  code: string
  createdAt: string
}

export type ApiSuccess<T> = { success: true; data: T }
export type ApiFailure = { success: false; error: string }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure
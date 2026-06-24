export interface LinkRecord {
  id: number
  code: string
  url: string
  clicks: number
  createdAt: Date
}

export type ShortenRequest = Pick<LinkRecord, "url"> & {
  code?: string
}

export type ShortenResponse = Pick<LinkRecord, "code"> & {
  shortUrl: string
}

export type HistoryItem = Pick<LinkRecord, "code" | "url"> & {
  shortUrl: string
  createdAt: string
}

export type ApiSuccess<T> = { success: true; data: T }
export type ApiFailure = { success: false; error: string }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export interface RateLimitResult {
  allowed: boolean
  retryAfter: number
}
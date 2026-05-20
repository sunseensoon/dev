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
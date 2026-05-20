const BLOCKED_DOMAINS = ["localhost", "127.0.0.1", "0.0.0.0"]
const MAX_URL_LENGTH = 2048
const CODE_REGEX = /^[a-zA-Z0-9_-]+$/

export function validateUrl(url: string): string | null {
  if (!url || url.trim().length === 0) return "URL is required."
  if (url.length > MAX_URL_LENGTH) return "URL is too long."

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return "Invalid URL. Make sure it includes http:// or https://"
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return "Only http and https URLs are allowed."
  }

  if (BLOCKED_DOMAINS.some((d) => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`))) {
    return "That URL is not allowed."
  }

  return null
}

export function validateCode(code: string): string | null {
  if (code.length < 2) return "Custom code must be at least 2 characters."
  if (code.length > 32) return "Custom code must be 32 characters or less."
  if (!CODE_REGEX.test(code)) return "Only letters, numbers, hyphens, and underscores are allowed."
  return null
}

export function generateCode(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join("")
}

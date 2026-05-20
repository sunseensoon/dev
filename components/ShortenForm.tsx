"use client"

import { useState } from "react"
import ResultCard from "@/components/ResultCard"
import type { ShortenResponse, ApiError } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://minguri.vercel.app"
const DISPLAY_DOMAIN = BASE_URL.replace(/^https?:\/\//, "") + "/"

export default function ShortenForm() {
  const [url, setUrl] = useState("")
  const [code, setCode] = useState("")
  const [result, setResult] = useState<ShortenResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, code: code.trim() || undefined }),
      })

      const data: ShortenResponse | ApiError = await res.json()

      if (!res.ok) {
        setError((data as ApiError).error)
      } else {
        setResult(data as ShortenResponse)
        setCode("")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <input
        type="url"
        placeholder="https://your-long-url.com/goes/here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-bg border border-border text-white transition focus:ring-2 focus:ring-accent placeholder:text-muted"
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl border border-border bg-bg overflow-hidden focus-within:ring-2 focus-within:ring-accent transition">
        <span className="px-3 py-2 sm:py-0 text-sm text-muted whitespace-nowrap select-none border-b border-border sm:border-b-0">
          {DISPLAY_DOMAIN}
        </span>
        <input
          type="text"
          placeholder="custom-alias (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 py-3 px-3 sm:px-0 sm:pr-4 text-sm outline-none bg-transparent text-white placeholder:text-muted"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[0.99] active:scale-[0.98] bg-white text-bg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      {result && <ResultCard shortUrl={result.shortUrl} />}
    </form>
  )
}
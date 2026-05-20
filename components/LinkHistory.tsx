"use client"

import { useState } from "react"
import type { HistoryItem } from "@/types"

interface Props {
  history: HistoryItem[]
  onClear: () => void
}

export default function LinkHistory({ history, onClear }: Props) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  if (history.length === 0) return null

  async function handleCopy(shortUrl: string, code: string) {
    await navigator.clipboard.writeText(shortUrl)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted uppercase tracking-widest">Recent links</p>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {history.map((item) => (
          <div
            key={item.code}
            className="w-full rounded-xl bg-card border border-border p-3 flex flex-col gap-2"
          >
            <a
              href={item.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm font-medium hover:underline break-all"
            >
              {item.shortUrl}
            </a>
            <p className="text-xs text-muted break-all">{item.originalUrl}</p>
            <button
              onClick={() => handleCopy(item.shortUrl, item.code)}
              className="w-full rounded-lg py-1.5 text-xs font-semibold transition-all hover:scale-[0.99] active:scale-[0.98] bg-white text-bg"
            >
              {copiedCode === item.code ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
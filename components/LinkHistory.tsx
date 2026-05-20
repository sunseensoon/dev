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
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted">
          Recent links
        </p>

        <button
          onClick={onClear}
          className="text-xs text-red-400 transition-colors hover:text-red-300"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((item) => (
          <div
            key={item.code}
            className="w-full rounded-xl border border-border bg-card p-3 sm:p-4 flex flex-col gap-3"
          >
            <div className="min-w-0 flex flex-col">
              <a
                href={item.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm font-medium text-accent hover:underline"
              >
                {item.shortUrl}
              </a>

              <p className="truncate text-xs text-muted">
                {item.originalUrl}
              </p>
            </div>

            <button
              onClick={() => handleCopy(item.shortUrl, item.code)}
              className="w-full sm:w-fit rounded-lg border border-border px-4 py-2 text-xs font-semibold transition-all hover:bg-white hover:text-bg"
            >
              {copiedCode === item.code ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
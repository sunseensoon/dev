"use client"

import { useState } from "react"

interface Props {
  shortUrl: string
}

export default function ResultCard({ shortUrl }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 flex-1 truncate text-sm font-medium text-accent hover:underline"
      >
        {shortUrl}
      </a>

      <button
        onClick={handleCopy}
        className="w-full sm:w-auto shrink-0 rounded-lg border border-border px-4 py-2 text-xs font-semibold transition-all hover:bg-white hover:text-bg"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}
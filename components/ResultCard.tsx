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
    <div className="w-full min-w-0 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium text-accent hover:underline"
        >
          {shortUrl}
        </a>

        <button
          onClick={handleCopy}
          className="w-full rounded-lg border border-border py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-bg"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}
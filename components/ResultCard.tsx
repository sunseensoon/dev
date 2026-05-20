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
    <div className="w-full rounded-xl bg-card border border-border p-4 flex items-center justify-between gap-4">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent text-sm font-medium truncate hover:underline"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all hover:scale-[0.97] active:scale-[0.94] bg-white text-bg"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

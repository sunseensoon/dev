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
    <div className="w-full rounded-xl bg-card border border-border p-4 flex flex-col gap-3">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent text-sm font-medium break-all hover:underline"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className="w-full rounded-lg py-2 text-xs font-semibold transition-all hover:scale-[0.99] active:scale-[0.98] bg-white text-bg"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}
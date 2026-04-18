"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleShorten() {
    if (!url) return;

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        longUrl: url
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data);return;}

    setShortUrl(
      `${window.location.origin}/${data.shortCode}`
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="text-3xl font-bold mb-6">
          URL Shortener
        </h1>

        <input
          type="text"
          placeholder="Paste long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleShorten}
          className="w-full bg-black text-white p-3 rounded"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <p className="mt-4 text-green-600">
            {shortUrl}
          </p>
        )}
      </div>
    </main>
  );
}
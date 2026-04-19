"use client";

import { useState } from "react";

export default function Home() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleShorten() {

    if (!url) return;

    setLoading(true);
    setCopied(false);

    try {

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          longUrl: url
        })
      });

      const data = await res.json();

      if (!res.ok) return;

      setShortUrl(
        `${window.location.origin}/${data.shortCode}`
      );

    } finally {

      setLoading(false);

    }
  }

  async function handleCopy() {

    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    },2000);

    setShortUrl(
      `${window.location.origin}/${data.shortCode}`
    );
  }

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Minguri
          </h1>

          <p className="text-gray-500 text-lg">
            Shorten long links into clean shareable URLs.
          </p>

        </div>

        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Paste a long URL..."
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            className="
              flex-1
              p-4
              rounded-2xl
              border
              border-gray-300
              bg-white
              outline-none
              focus:ring-2
              focus:ring-black
              focus:border-black
            "
          />

          <button
            onClick={handleShorten}
            disabled={loading}
            className="
              px-6
              rounded-2xl
              bg-black
              text-white
              font-semibold
            "
          >
            {loading ? "Working..." : "Shorten"}
          </button>

        </div>

        {shortUrl && (

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

            <p className="text-sm text-gray-500 mb-3">
              Your short link:
            </p>

            <div className="flex gap-3 items-center">

              <a
                href={shortUrl}
                target="_blank"
                className="
                  flex-1
                  text-green-700
                  break-all
                  font-medium
                "
              >
                {shortUrl}
              </a>

              <button
                onClick={handleCopy}
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-black
                  text-white
                "
              >
                {copied ? "Copied!" : "Copy"}
              </button>

            </div>

          </div>

        )}

        <div className="text-center text-sm text-gray-400 mt-8">
          Fast · Free · No Signup
        </div>

      </div>

    </main>

  );
}
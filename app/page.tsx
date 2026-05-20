import ShortenForm from "@/components/ShortenForm"

const FEATURES = [
  "No signup required, ever",
  "Custom aliases",
  "Fast redirects globally",
]

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-bg">
      <div className="w-full max-w-lg rounded-2xl p-10 bg-card border border-border flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">minguri</h1>
          <p className="text-muted-light text-sm">Custom short links, instantly.</p>
          <ul className="flex flex-col gap-1">
            {FEATURES.map((f) => (
              <li key={f} className="text-sm text-muted flex items-center gap-2">
                <span className="text-accent">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        <ShortenForm />

        <p className="text-center text-xs text-muted tracking-widest">
          FAST · FREE · NO SIGNUP
        </p>
      </div>
    </main>
  )
}

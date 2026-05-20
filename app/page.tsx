import ShortenForm from "@/components/ShortenForm"

const FEATURES = [
  "No signup required, ever",
  "Custom aliases",
  "Fast redirects globally",
]

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center p-6 bg-bg">
      <section className="w-full max-w-lg p-10 rounded-2xl border border-border bg-card flex flex-col gap-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight leading-none">
              <span className="text-white">ming</span>
              <span className="text-accent">uri</span>
              <span className="text-white">.</span>
            </h1>

            <p className="mt-2 text-sm text-muted-light">
              Custom short links, instantly.
            </p>
          </div>

          <ul className="pl-5 space-y-1 list-disc">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="text-sm text-muted marker:text-accent"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <ShortenForm />

        <p className="text-xs text-center tracking-widest text-muted">
          FAST · FREE · NO SIGNUP
        </p>
      </section>
    </main>
  )
}
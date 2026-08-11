export default function AuthShell({ title, subtitle, children, kicker }) {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-[linear-gradient(160deg,rgba(15,23,42,0.96),rgba(67,56,202,0.98))] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">CareerAI</p>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-tight">Your AI-powered career copilot.</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/75">Analyze your resume, match jobs, close skill gaps, and build a clear next-step strategy with a premium AI career platform.</p>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/70">Why CareerAI</p>
          <p className="text-sm leading-7 text-white/80">Built for professionals who want a polished, trustworthy workflow for resume intelligence, interview prep, and career planning.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <p className="eyebrow">{kicker || 'Welcome back'}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{title}</h2>
          {subtitle ? <p className="mt-3 text-sm leading-7 text-slate">{subtitle}</p> : null}
          <div className="card mt-8 p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
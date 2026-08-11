export default function ResponsiveTableCards({ rows }) {
  return (
    <div className="grid gap-4 md:hidden">
      {rows.map((row) => (
        <div key={`${row.company}-${row.position}`} className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-ink">{row.company}</p>
              <p className="text-sm text-slate">{row.position}</p>
            </div>
            <span className="chip">{row.match}%</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {row.skills.map((skill) => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate">{row.status}</p>
        </div>
      ))}
    </div>
  )
}
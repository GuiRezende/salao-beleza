export function ProgressBar({ segments, label }) {
  const total = segments.reduce((soma, s) => soma + s.value, 0)

  return (
    <div>
      <span className="sr-only">{label}</span>
      <div className="flex h-2 w-full gap-1" aria-hidden="true">
        {total === 0 ? (
          <div className="h-full w-full rounded-full bg-surface" />
        ) : (
          segments
            .filter((s) => s.value > 0)
            .map((s) => (
              <div key={s.label} className={`h-full rounded-full ${s.className}`} style={{ flexGrow: s.value }} />
            ))
        )}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${s.className}`} aria-hidden="true" />
            {s.label}
            <span className="font-medium text-foreground">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

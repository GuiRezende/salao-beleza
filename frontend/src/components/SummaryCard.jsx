export function SummaryCard({ label, value, description, icon: Icon, loading = false, children }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm text-muted-foreground">{label}</h2>
        {Icon && (
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
      {loading ? (
        <div className="flex flex-col gap-2" aria-hidden="true">
          <div className="h-8 w-28 animate-pulse rounded-md bg-surface" />
          <div className="h-3 w-40 animate-pulse rounded bg-surface" />
        </div>
      ) : (
        <div>
          <p className="text-3xl font-semibold tracking-tight text-balance">{value}</p>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      {!loading && children}
    </article>
  )
}

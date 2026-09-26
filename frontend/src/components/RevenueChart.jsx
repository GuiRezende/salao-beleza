export function RevenueChart({ data, formatValue, formatLabel, formatTooltipLabel }) {
  const max = Math.max(...data.map((d) => d.valor), 1)

  return (
    <figure>
      <ul className="flex h-52 items-end gap-1.5 sm:gap-2" aria-label="Faturamento por período">
        {data.map((d) => {
          const altura = Math.max((d.valor / max) * 100, 2)
          return (
            <li key={d.data} className="group flex h-full flex-1 flex-col justify-end">
              <div
                className="relative w-full rounded-md bg-primary/70 transition-colors group-hover:bg-primary"
                style={{ height: `${altura}%` }}
              >
                <span className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {formatTooltipLabel(d.data)} · {formatValue(d.valor)}
                </span>
              </div>
              <span className="sr-only">
                {formatTooltipLabel(d.data)}: {formatValue(d.valor)}
              </span>
            </li>
          )
        })}
      </ul>
      <div className="mt-2 flex gap-1.5 sm:gap-2" aria-hidden="true">
        {data.map((d) => (
          <span key={d.data} className="flex-1 truncate text-center text-[11px] text-muted-foreground">
            {formatLabel(d.data)}
          </span>
        ))}
      </div>
    </figure>
  )
}

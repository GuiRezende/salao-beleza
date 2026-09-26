const CONTAINER = {
  underline: 'flex gap-1 overflow-x-auto border-b border-border',
  pill: 'inline-flex rounded-lg border border-border bg-surface p-1',
}

const ITEM = {
  underline: {
    base: '-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
    active: 'border-primary text-foreground',
    inactive: 'border-transparent text-muted-foreground hover:text-foreground',
  },
  pill: {
    base: 'flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
    active: 'bg-card text-foreground shadow-sm',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
}

export function Tabs({ items, value, onChange, variant = 'underline', label }) {
  const styles = ITEM[variant]

  return (
    <div role="tablist" aria-label={label} className={CONTAINER[variant]}>
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={`${styles.base} ${active ? styles.active : styles.inactive}`}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none ${active ? 'bg-primary/15 text-primary' : 'bg-surface text-muted-foreground'}`}
              >
                {item.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

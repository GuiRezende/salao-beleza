const VARIANTS = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'border border-border bg-card text-foreground hover:bg-surface',
  ghost: 'text-muted-foreground hover:bg-surface hover:text-foreground',
}

const SIZES = {
  md: 'h-10 px-4 text-sm',
  sm: 'h-8 px-3 text-xs',
  icon: 'size-9',
}

export function Button({ variant = 'primary', size = 'md', icon: Icon, children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
    </button>
  )
}

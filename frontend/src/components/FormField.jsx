export function FormField({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

const CAMPO_CLASSNAME =
  'h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary'

export function Input(props) {
  return <input className={CAMPO_CLASSNAME} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={`${CAMPO_CLASSNAME} w-full min-w-0`} {...props}>
      {children}
    </select>
  )
}

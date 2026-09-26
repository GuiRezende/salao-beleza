import { Search } from 'lucide-react'

export function SearchInput({ value, onChange, placeholder, label }) {
  return (
    <label className="relative flex w-full max-w-sm items-center">
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </label>
  )
}

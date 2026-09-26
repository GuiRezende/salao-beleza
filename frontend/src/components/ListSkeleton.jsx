export function ListSkeleton({ rows = 6, className = 'h-14' }) {
  return (
    <div className="flex flex-col gap-2 p-4" aria-busy="true" aria-label="Carregando">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={`animate-pulse rounded-lg bg-surface ${className}`} />
      ))}
    </div>
  )
}

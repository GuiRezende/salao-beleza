import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export function WeekNavigator({ label, onPrevious, onNext, onToday, previousLabel, nextLabel }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg border border-border bg-card">
        <button
          type="button"
          onClick={onPrevious}
          className="flex size-9 items-center justify-center rounded-l-lg text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label={previousLabel}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <span className="min-w-36 border-x border-border px-3 text-center text-sm font-medium" aria-live="polite">
          {label}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="flex size-9 items-center justify-center rounded-r-lg text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label={nextLabel}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <Button variant="secondary" size="sm" className="h-9" onClick={onToday}>
        Hoje
      </Button>
    </div>
  )
}

import { RefreshCw } from 'lucide-react'
import { Button } from './Button'

export function LoadError({ message }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-semibold">Não foi possível carregar os dados.</p>
        <p className="mt-1 break-words text-sm text-muted-foreground">{message}</p>
      </div>
      <Button variant="secondary" size="sm" icon={RefreshCw} onClick={() => window.location.reload()}>
        Tentar novamente
      </Button>
    </div>
  )
}
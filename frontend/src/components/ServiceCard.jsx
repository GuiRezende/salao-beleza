import { Clock, Pencil, Scissors, Trash2 } from 'lucide-react'
import { formatCurrency, formatDuration } from '../utils/format'
import { Button } from './Button'

export function ServiceCard({ servico, onEdit, onDelete }) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Scissors className="size-4" aria-hidden="true" />
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs text-muted-foreground">
            <Clock className="size-3" aria-hidden="true" />
            {servico.tempoDuracao} min
            <span className="sr-only">({formatDuration(servico.tempoDuracao)})</span>
          </span>
          <Button size="icon" variant="ghost" icon={Pencil} onClick={onEdit} aria-label={`Editar ${servico.nomeTipo}`} title="Editar serviço" />
          <Button size="icon" variant="ghost" icon={Trash2} onClick={onDelete} aria-label={`Excluir ${servico.nomeTipo}`} title="Excluir serviço" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold">{servico.nomeTipo}</h3>
        <p className="mt-1 text-2xl font-bold tracking-tight">{formatCurrency(servico.valor)}</p>
      </div>
    </article>
  )
}

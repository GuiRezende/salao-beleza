import { Clock, Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatTime } from '../utils/format'
import { Button } from './Button'
import { StatusBadge } from './StatusBadge'

export function AppointmentCard({ agendamento, status, onEdit, onDelete }) {
  const { dataHoraInicio, dataHoraFim, cliente, servicos, valorTotal } = agendamento

  return (
    <article className="rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-primary/40">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Clock className="size-3" aria-hidden="true" />
        <time dateTime={dataHoraInicio}>{formatTime(dataHoraInicio)}</time>
        {'–'}
        <time dateTime={dataHoraFim}>{formatTime(dataHoraFim)}</time>
      </p>
      <h3 className="mt-2 truncate text-sm font-semibold">{cliente.nome}</h3>
      <ul className="mt-2 flex flex-col gap-1.5">
        {servicos.map((item, index) => (
          <li key={`${item.servico._id}-${index}`} className="border-l-2 border-primary/40 pl-2 text-xs">
            <p className="truncate">{item.servico.nomeTipo}</p>
            <p className="truncate text-muted-foreground">{item.profissional.nome}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2">
        <span className="text-xs font-semibold">{formatCurrency(valorTotal)}</span>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>
      <div className="flex justify-end gap-1">
        <Button size="icon" variant="ghost" icon={Pencil} onClick={() => onEdit?.(agendamento)} aria-label={`Editar agendamento de ${cliente.nome}`} title="Editar agendamento" />
        <Button size="icon" variant="ghost" icon={Trash2} onClick={() => onDelete?.(agendamento)} aria-label={`Excluir agendamento de ${cliente.nome}`} title="Excluir agendamento" />
      </div>
    </article>
  )
}

import { formatCurrency, formatDate } from '../utils/format'
import { Avatar } from './Avatar'
import { StatusBadge } from './StatusBadge'

export function TransactionRow({ agendamento, status }) {
  const nomesServicos = agendamento.servicos.map((item) => item.servico.nomeTipo).join(', ')

  return (
    <tr className="border-t border-border text-sm transition-colors hover:bg-surface/60">
      <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground md:table-cell">
        <time dateTime={agendamento.dataHoraInicio}>{formatDate(agendamento.dataHoraInicio)}</time>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={agendamento.cliente.nome} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{agendamento.cliente.nome}</p>
            <p className="truncate text-xs text-muted-foreground md:hidden">
              {formatDate(agendamento.dataHoraInicio)} · {nomesServicos}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden max-w-64 truncate px-5 py-3.5 text-muted-foreground md:table-cell">{nomesServicos}</td>
      <td className="whitespace-nowrap px-5 py-3.5 font-semibold">{formatCurrency(agendamento.valorTotal)}</td>
      <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground lg:table-cell">
        {agendamento.pagamento?.formaPagamento ?? 'Não informado'}
      </td>
      <td className="px-5 py-3.5">
        <StatusBadge label={status.label} tone={status.tone} />
      </td>
    </tr>
  )
}

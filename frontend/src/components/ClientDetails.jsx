import { Pencil, Trash2 } from 'lucide-react'
import { STATUS_AGENDAMENTO } from '../constants/status'
import { calcularIdade, formatCurrency, formatDate } from '../utils/format'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { DetailField } from './DetailField'
import { StatusBadge } from './StatusBadge'

export function ClientDetails({ cliente, onEdit, onDelete }) {
  const { endereco } = cliente

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={cliente.nome} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{cliente.nome}</p>
            <p className="text-sm text-muted-foreground">{cliente.telefone}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="icon" variant="ghost" icon={Pencil} onClick={onEdit} aria-label="Editar cliente" title="Editar cliente" />
          <Button size="icon" variant="ghost" icon={Trash2} onClick={onDelete} aria-label="Excluir cliente" title="Excluir cliente" />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface p-4">
        <DetailField label="Agendamentos" value={cliente.quantidadeAgendamentos} />
        <DetailField label="Total gasto" value={formatCurrency(cliente.totalGasto)} />
      </dl>

      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Dados pessoais</h3>
        <dl className="mt-3 grid grid-cols-2 gap-4">
          <DetailField label="CPF" value={cliente.cpf} />
          <DetailField
            label="Nascimento"
            value={`${formatDate(cliente.dataNascimento)} (${calcularIdade(cliente.dataNascimento)} anos)`}
          />
          <DetailField
            className="col-span-2"
            label="Endereço"
            value={`${endereco.logradouro}, ${endereco.numero} · ${endereco.cidade}/${endereco.estado} · CEP ${endereco.cep}`}
          />
        </dl>
      </section>

      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Histórico de agendamentos
        </h3>
        {cliente.historico.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nenhum agendamento registrado.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {cliente.historico.map((agendamento) => {
              const status = STATUS_AGENDAMENTO[agendamento.status]
              return (
                <li key={agendamento._id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <time className="text-xs text-muted-foreground" dateTime={agendamento.dataHoraInicio}>
                      {formatDate(agendamento.dataHoraInicio)}
                    </time>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </div>
                  <p className="mt-1.5 text-sm font-medium">
                    {agendamento.servicos.map((item) => item.servico.nomeTipo).join(', ')}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(agendamento.valorTotal)}</p>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

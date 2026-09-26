import { Avatar } from './Avatar'
import { StatusBadge } from './StatusBadge'

export function ProfessionalCard({ profissional, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(profissional._id)}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <Avatar name={profissional.nome} size="lg" />
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          <h3 className="truncate font-semibold">{profissional.nome}</h3>
          <StatusBadge label={profissional.especialidade} tone="primary" showDot={false} />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4">
        <div>
          <dt className="text-xs text-muted-foreground">Telefone</dt>
          <dd className="mt-1 text-sm font-medium">{profissional.telefone}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Atendimentos no mês</dt>
          <dd className="mt-1 text-sm font-semibold">{profissional.atendimentosNoMes}</dd>
        </div>
      </dl>
    </button>
  )
}

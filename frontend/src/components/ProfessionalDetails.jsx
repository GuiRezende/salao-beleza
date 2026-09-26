import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils/format'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { DetailField } from './DetailField'
import { StatusBadge } from './StatusBadge'

export function ProfessionalDetails({ profissional, onEdit, onDelete }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={profissional.nome} size="lg" />
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <p className="truncate text-lg font-semibold">{profissional.nome}</p>
            <StatusBadge label={profissional.especialidade} tone="primary" showDot={false} />
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="icon" variant="ghost" icon={Pencil} onClick={onEdit} aria-label="Editar profissional" title="Editar profissional" />
          <Button size="icon" variant="ghost" icon={Trash2} onClick={onDelete} aria-label="Excluir profissional" title="Excluir profissional" />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface p-4">
        <DetailField label="Atendimentos no mês" value={profissional.atendimentosNoMes} />
        <DetailField label="Salário" value={formatCurrency(profissional.salario)} />
      </dl>

      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Informações</h3>
        <dl className="mt-3 grid grid-cols-2 gap-4">
          <DetailField label="Telefone" value={profissional.telefone} />
          <DetailField label="CPF" value={profissional.cpf} />
          <DetailField
            className="col-span-2"
            label="Localização"
            value={`${profissional.endereco.cidade}/${profissional.endereco.estado}`}
          />
        </dl>
      </section>
    </div>
  )
}

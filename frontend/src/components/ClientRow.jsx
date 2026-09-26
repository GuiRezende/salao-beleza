import { formatCurrency } from '../utils/format'
import { Avatar } from './Avatar'

export const CLIENT_GRID =
  'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)]'

export function ClientRow({ cliente, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(cliente._id)}
        className={`${CLIENT_GRID} w-full px-5 py-3.5 text-left text-sm transition-colors hover:bg-surface`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <Avatar name={cliente.nome} />
          <span className="min-w-0">
            <span className="block truncate font-semibold">{cliente.nome}</span>
            <span className="block truncate text-xs text-muted-foreground md:hidden">{cliente.telefone}</span>
          </span>
        </span>
        <span className="hidden truncate text-muted-foreground md:block">{cliente.telefone}</span>
        <span className="hidden truncate text-muted-foreground md:block">
          {cliente.endereco.cidade}/{cliente.endereco.estado}
        </span>
        <span className="hidden md:block">{cliente.quantidadeAgendamentos}</span>
        <span className="text-right font-semibold md:text-left">{formatCurrency(cliente.totalGasto)}</span>
      </button>
    </li>
  )
}

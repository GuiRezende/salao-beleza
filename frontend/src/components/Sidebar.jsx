import { Moon, Sparkles, Sun, X } from 'lucide-react'
import { Avatar } from './Avatar'
import { SidebarItem } from './SidebarItem'

export function Sidebar({ salonName, items, activeId, onSelect, user, theme, onToggleTheme, open, onClose }) {
  const isDark = theme === 'dark'

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between gap-2 px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate text-base font-bold tracking-tight">{salonName}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-surface lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Menu</p>
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={item.id === activeId}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-3 border-t border-border p-3">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
          <span className="flex items-center gap-3">
            {isDark ? <Moon className="size-4" aria-hidden="true" /> : <Sun className="size-4" aria-hidden="true" />}
            {isDark ? 'Tema escuro' : 'Tema claro'}
          </span>
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-border'}`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${isDark ? 'left-4.5' : 'left-0.5'}`}
            />
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
          <Avatar name={user.nome} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.nome}</p>
            <p className="truncate text-xs text-muted-foreground">{user.cargo}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

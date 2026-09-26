export function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? 'bg-primary/15 text-primary'
            : 'text-muted-foreground hover:bg-surface hover:text-foreground'
        }`}
      >
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </button>
    </li>
  )
}

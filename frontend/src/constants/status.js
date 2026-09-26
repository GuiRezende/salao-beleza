export const TONE_STYLES = {
  primary: { badge: 'bg-primary/15 text-primary', dot: 'bg-primary' },
  warning: { badge: 'bg-warning/15 text-warning', dot: 'bg-warning' },
  success: { badge: 'bg-success/15 text-success', dot: 'bg-success' },
  neutral: { badge: 'bg-surface text-muted-foreground', dot: 'bg-muted-foreground' },
}

export const STATUS_AGENDAMENTO = {
  confirmado: { label: 'Confirmado', tone: 'primary' },
  pendente: { label: 'Pendente', tone: 'warning' },
  concluido: { label: 'Concluído', tone: 'success' },
}

export const STATUS_PAGAMENTO = {
  pago: { label: 'Pago', tone: 'success' },
  pendente: { label: 'Pendente', tone: 'warning' },
}

export const FILTROS_AGENDA = [
  { value: 'todos', label: 'Todos' },
  { value: 'confirmado', label: 'Confirmados' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'concluido', label: 'Concluídos' },
]

export const FILTROS_PAGAMENTO = [
  { value: 'todos', label: 'Todas' },
  { value: 'pago', label: 'Pagas' },
  { value: 'pendente', label: 'Pendentes' },
]

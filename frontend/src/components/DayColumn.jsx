import { STATUS_AGENDAMENTO } from '../constants/status'
import { formatWeekdayShort } from '../utils/format'
import { AppointmentCard } from './AppointmentCard'

export function DayColumn({ date, isToday, agendamentos, onEdit, onDelete }) {
  return (
    <section
      className={`flex min-w-0 flex-col gap-3 rounded-2xl border p-3 ${isToday ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'}`}
      aria-label={date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
    >
      <header className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-8 items-center justify-center rounded-lg text-sm font-bold ${isToday ? 'bg-primary text-primary-foreground' : 'bg-surface'}`}
          >
            {date.getDate()}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {formatWeekdayShort(date)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{agendamentos.length}</span>
      </header>

      {agendamentos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
          Sem agendamentos
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {agendamentos.map((agendamento) => (
            <AppointmentCard
              key={agendamento._id}
              agendamento={agendamento}
              status={STATUS_AGENDAMENTO[agendamento.status]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

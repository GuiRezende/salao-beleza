import { CalendarCheck, Plus, TrendingUp, UserPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { AgendamentoFormModal } from '../components/AgendamentoFormModal'
import { AppointmentCard } from '../components/AppointmentCard'
import { Button } from '../components/Button'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'
import { DayColumn } from '../components/DayColumn'
import { LoadError } from '../components/LoadError'
import { PageHeader } from '../components/PageHeader'
import { ProgressBar } from '../components/ProgressBar'
import { SummaryCard } from '../components/SummaryCard'
import { Tabs } from '../components/Tabs'
import { WeekNavigator } from '../components/WeekNavigator'
import { FILTROS_AGENDA, STATUS_AGENDAMENTO } from '../constants/status'
import { buscarAgenda, excluirAgendamento } from '../services/api'
import { addDays, endOfDay, isSameDay, isWithin, startOfDay, startOfWeek } from '../utils/dates'
import { formatCurrency, formatDayMonth, formatLongDate } from '../utils/format'

const VISUALIZACOES = [
  { value: 'dia', label: 'Dia' },
  { value: 'semana', label: 'Semana' },
]

const DIAS_UTEIS = 6

export function AgendaPage() {
  const [view, setView] = useState('semana')
  const [referenceDate, setReferenceDate] = useState(() => startOfDay(new Date()))
  const [statusFilter, setStatusFilter] = useState('todos')
  const [resultado, setResultado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [atualizacoes, setAtualizacoes] = useState(0)
  const [editando, setEditando] = useState(null)
  const [excluir, setExcluir] = useState(null)
  const [erro, setErro] = useState(null)

  const range = useMemo(() => {
    if (view === 'dia') return { inicio: startOfDay(referenceDate), fim: endOfDay(referenceDate) }
    const inicio = startOfWeek(referenceDate)
    return { inicio, fim: endOfDay(addDays(inicio, 6)) }
  }, [view, referenceDate])

  const chaveConsulta = `${range.inicio.toISOString()}|${referenceDate.toISOString()}|${statusFilter}|${atualizacoes}`

  useEffect(() => {
    let ativo = true
    buscarAgenda({ ...range, dia: referenceDate, status: statusFilter }).then((resposta) => {
      if (ativo) {
        setErro(null)
        setResultado({ chave: chaveConsulta, dados: resposta })
      }
    }).catch((error) => {
      if (ativo) setErro(error.message)
    })
    return () => {
      ativo = false
    }
  }, [range, referenceDate, statusFilter, chaveConsulta])

  const agenda = resultado?.dados ?? null
  const loading = !erro && resultado?.chave !== chaveConsulta

  const today = new Date()
  const passo = view === 'semana' ? 7 : 1
  const unidade = view === 'semana' ? 'semana' : 'dia'
  const rangeLabel =
    view === 'semana'
      ? `${formatDayMonth(range.inicio)} – ${formatDayMonth(addDays(range.inicio, DIAS_UTEIS - 1))}`
      : formatDayMonth(referenceDate)

  const resumo = agenda?.resumo
  const lista = agenda?.agendamentos ?? []
  const diasDaSemana = Array.from({ length: DIAS_UTEIS }, (_, i) => addDays(range.inicio, i))

  const tabs = FILTROS_AGENDA.map((filtro) => ({
    ...filtro,
    count:
      resumo &&
      (filtro.value === 'todos' ? resumo.totalPeriodo : resumo.porStatusPeriodo[filtro.value]),
  }))

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={`Agenda · ${formatLongDate(today)}`}
        title="Agenda"
        action={<Button icon={Plus} onClick={() => { setEditando(null); setModalAberto(true) }}>Novo agendamento</Button>}
      />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Resumo">
        <SummaryCard
          label={isSameDay(referenceDate, today) ? 'Agendamentos de hoje' : `Agendamentos em ${formatDayMonth(referenceDate)}`}
          value={resumo?.dia.total ?? 0}
          icon={CalendarCheck}
          loading={loading && !resumo}
        >
          {resumo && (
            <ProgressBar
              label="Agendamentos por status"
              segments={[
                { label: 'Concluídos', value: resumo.dia.porStatus.concluido, className: 'bg-success' },
                { label: 'Confirmados', value: resumo.dia.porStatus.confirmado, className: 'bg-primary' },
                { label: 'Pendentes', value: resumo.dia.porStatus.pendente, className: 'bg-warning' },
              ]}
            />
          )}
        </SummaryCard>
        <SummaryCard
          label="Faturamento previsto"
          value={formatCurrency(resumo?.faturamentoPrevisto)}
          description={`${resumo?.totalPeriodo ?? 0} agendamentos ${view === 'semana' ? 'na semana' : 'no dia'}`}
          icon={TrendingUp}
          loading={loading && !resumo}
        />
        <SummaryCard
          label="Novos clientes"
          value={resumo?.novosClientes ?? 0}
          description={`Primeira visita ${view === 'semana' ? 'nesta semana' : 'neste dia'}`}
          icon={UserPlus}
          loading={loading && !resumo}
        />
      </section>

      <section className="flex flex-col gap-4" aria-label="Agendamentos">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <WeekNavigator
            label={rangeLabel}
            onPrevious={() => setReferenceDate((d) => addDays(d, -passo))}
            onNext={() => setReferenceDate((d) => addDays(d, passo))}
            onToday={() => setReferenceDate(startOfDay(new Date()))}
            previousLabel={`${unidade === 'semana' ? 'Semana' : 'Dia'} anterior`}
            nextLabel={`Próxim${unidade === 'semana' ? 'a semana' : 'o dia'}`}
          />
          <Tabs items={VISUALIZACOES} value={view} onChange={setView} variant="pill" label="Visualização" />
        </div>

        <Tabs items={tabs} value={statusFilter} onChange={setStatusFilter} label="Filtrar por status" />

        <div
          className={`transition-opacity ${loading ? 'pointer-events-none opacity-50' : ''}`}
          aria-busy={loading}
        >
          {erro ? (
            <LoadError message={erro} />
          ) : !agenda ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: DIAS_UTEIS }, (_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-card" />
              ))}
            </div>
          ) : view === 'semana' ? (
            <div className="overflow-x-auto pb-2">
              <div className="grid min-w-[960px] grid-cols-6 gap-3">
                {diasDaSemana.map((dia) => (
                  <DayColumn
                    key={dia.toISOString()}
                    date={dia}
                    isToday={isSameDay(dia, today)}
                    agendamentos={lista.filter((a) => isWithin(a.dataHoraInicio, dia, endOfDay(dia)))}
                    onEdit={(agendamento) => { setEditando(agendamento); setModalAberto(true) }}
                    onDelete={(agendamento) => setExcluir(agendamento)}
                  />
                ))}
              </div>
            </div>
          ) : lista.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border px-4 py-16 text-center text-sm text-muted-foreground">
              Nenhum agendamento para {formatLongDate(referenceDate)}.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {lista.map((agendamento) => (
                <AppointmentCard
                  key={agendamento._id}
                  agendamento={agendamento}
                  status={STATUS_AGENDAMENTO[agendamento.status]}
                  onEdit={(item) => { setEditando(item); setModalAberto(true) }}
                  onDelete={setExcluir}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AgendamentoFormModal
        key={modalAberto ? (editando ? editando._id : 'novo') : 'fechado'}
        open={modalAberto}
        agendamento={editando}
        onClose={() => { setModalAberto(false); setEditando(null) }}
        onSalvo={() => setAtualizacoes((n) => n + 1)}
      />
      <ConfirmDeleteModal
        open={Boolean(excluir)}
        title="Excluir agendamento"
        description={`Excluir o agendamento de ${excluir?.cliente?.nome ?? 'cliente'}? Ele também será removido dos totais financeiros.`}
        onClose={() => setExcluir(null)}
        onConfirm={async () => { await excluirAgendamento(excluir._id); setAtualizacoes((n) => n + 1) }}
      />
    </div>
  )
}

import { CircleDollarSign, Clock3, Receipt } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LoadError } from '../components/LoadError'
import { ListSkeleton } from '../components/ListSkeleton'
import { PageHeader } from '../components/PageHeader'
import { RevenueChart } from '../components/RevenueChart'
import { SummaryCard } from '../components/SummaryCard'
import { Tabs } from '../components/Tabs'
import { TransactionRow } from '../components/TransactionRow'
import { FILTROS_PAGAMENTO, STATUS_PAGAMENTO } from '../constants/status'
import { buscarFinanceiro } from '../services/api'
import { addDays } from '../utils/dates'
import { formatCurrency, formatDayMonth, formatMonthYear } from '../utils/format'

const PERIODOS = [
  { value: 'diario', label: 'Diário' },
  { value: 'semanal', label: 'Semanal' },
]

const formatarLabelGrafico = {
  diario: (iso) => String(new Date(iso).getDate()),
  semanal: (iso) => formatDayMonth(new Date(iso)),
}

const formatarTooltipGrafico = {
  diario: (iso) => formatDayMonth(new Date(iso)),
  semanal: (iso) => `${formatDayMonth(new Date(iso))} – ${formatDayMonth(addDays(new Date(iso), 6))}`,
}

export function FinanceiroPage() {
  const [filtro, setFiltro] = useState('todos')
  const [periodo, setPeriodo] = useState('diario')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    let ativo = true
    buscarFinanceiro({ referencia: new Date(), statusPagamento: filtro }).then((resposta) => {
      if (ativo) {
        setErro(null)
        setResultado({ filtro, dados: resposta })
      }
    }).catch((error) => {
      if (ativo) setErro(error.message)
    })
    return () => {
      ativo = false
    }
  }, [filtro])

  const dados = resultado?.dados ?? null
  const loading = !erro && resultado?.filtro !== filtro

  const resumo = dados?.resumo
  const mesAtual = formatMonthYear(new Date())
  const carregandoInicial = loading && !dados

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow={`Financeiro · ${mesAtual}`} title="Financeiro" />

      {erro ? (
        <LoadError message={erro} />
      ) : (
        <>
      <section className="grid gap-4 md:grid-cols-3" aria-label="Resumo financeiro">
        <SummaryCard
          label="Total recebido no mês"
          value={formatCurrency(resumo?.recebido)}
          description={`${resumo?.quantidadePagos ?? 0} pagamentos confirmados`}
          icon={CircleDollarSign}
          loading={carregandoInicial}
        />
        <SummaryCard
          label="Valor a receber"
          value={formatCurrency(resumo?.aReceber)}
          description={`${resumo?.quantidadePendentes ?? 0} pagamentos pendentes`}
          icon={Clock3}
          loading={carregandoInicial}
        />
        <SummaryCard
          label="Ticket médio"
          value={formatCurrency(resumo?.ticketMedio)}
          description="Média por atendimento pago"
          icon={Receipt}
          loading={carregandoInicial}
        />
      </section>

      <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="titulo-faturamento">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="titulo-faturamento" className="font-semibold">
              Faturamento recebido
            </h2>
            <p className="text-xs text-muted-foreground">
              {periodo === 'diario' ? 'Últimos 14 dias' : 'Últimas 6 semanas'}
            </p>
          </div>
          <Tabs items={PERIODOS} value={periodo} onChange={setPeriodo} variant="pill" label="Período do gráfico" />
        </div>
        {dados ? (
          <RevenueChart
            data={dados.series[periodo]}
            formatValue={formatCurrency}
            formatLabel={formatarLabelGrafico[periodo]}
            formatTooltipLabel={formatarTooltipGrafico[periodo]}
          />
        ) : (
          <div className="h-60 animate-pulse rounded-xl bg-surface" />
        )}
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="titulo-transacoes">
        <h2 id="titulo-transacoes" className="font-semibold">
          Transações do mês
        </h2>
        <Tabs items={FILTROS_PAGAMENTO} value={filtro} onChange={setFiltro} label="Filtrar por pagamento" />

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {loading ? (
            <ListSkeleton rows={8} />
          ) : dados.transacoes.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="hidden px-5 py-3 font-semibold md:table-cell">Data</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Cliente</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold md:table-cell">Serviços</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Valor</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold lg:table-cell">Forma</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.transacoes.map((agendamento) => (
                    <TransactionRow
                      key={agendamento._id}
                      agendamento={agendamento}
                      status={STATUS_PAGAMENTO[agendamento.statusPagamento]}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
        </>
      )}
    </div>
  )
}

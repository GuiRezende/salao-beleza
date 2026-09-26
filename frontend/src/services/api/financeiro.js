import { addDays, endOfDay, endOfMonth, isWithin, startOfDay, startOfMonth, startOfWeek } from '../../utils/dates'
import { getAgendamentos } from './agendamentos.js'

const somarValor = (lista) => lista.reduce((soma, agendamento) => soma + (agendamento.valorTotal ?? 0), 0)
const porInicio = (a, b) => new Date(a.dataHoraInicio) - new Date(b.dataHoraInicio)

function montarSerieDiaria(agendamentos, referencia, dias) {
  return Array.from({ length: dias }, (_, i) => {
    const dia = addDays(startOfDay(referencia), i - dias + 1)
    const pagos = agendamentos.filter(
      (agendamento) => agendamento.statusPagamento === 'pago' && isWithin(agendamento.dataHoraInicio, dia, endOfDay(dia)),
    )
    return { data: dia.toISOString(), valor: somarValor(pagos) }
  })
}

function montarSerieSemanal(agendamentos, referencia, semanas) {
  const semanaAtual = startOfWeek(referencia)
  return Array.from({ length: semanas }, (_, i) => {
    const inicio = addDays(semanaAtual, (i - semanas + 1) * 7)
    const fim = endOfDay(addDays(inicio, 6))
    const pagos = agendamentos.filter(
      (agendamento) => agendamento.statusPagamento === 'pago' && isWithin(agendamento.dataHoraInicio, inicio, fim),
    )
    return { data: inicio.toISOString(), valor: somarValor(pagos) }
  })
}

export async function buscarFinanceiro({ referencia = new Date(), statusPagamento = 'todos' }) {
  const agendamentos = await getAgendamentos()
  const doMes = agendamentos.filter((agendamento) =>
    isWithin(agendamento.dataHoraInicio, startOfMonth(referencia), endOfMonth(referencia)),
  )
  const pagos = doMes.filter((agendamento) => agendamento.statusPagamento === 'pago')
  const pendentes = doMes.filter((agendamento) => agendamento.statusPagamento === 'pendente')
  const transacoes = (statusPagamento === 'todos'
    ? doMes
    : doMes.filter((agendamento) => agendamento.statusPagamento === statusPagamento)
  ).toSorted((a, b) => porInicio(b, a))

  return {
    resumo: {
      recebido: somarValor(pagos),
      aReceber: somarValor(pendentes),
      ticketMedio: pagos.length ? somarValor(pagos) / pagos.length : 0,
      quantidadePagos: pagos.length,
      quantidadePendentes: pendentes.length,
    },
    series: {
      diario: montarSerieDiaria(agendamentos, referencia, 14),
      semanal: montarSerieSemanal(agendamentos, referencia, 6),
    },
    transacoes,
  }
}
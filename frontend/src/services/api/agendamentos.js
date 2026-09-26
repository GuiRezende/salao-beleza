import { endOfDay, isWithin, startOfDay } from '../../utils/dates'
import { buscarComCache, invalidarCache } from './cache.js'
import { mutar, requisitar } from './http.js'
import { normalizarAgendamento } from './normalizadores.js'

export function getAgendamentos() {
  return buscarComCache('agendamentos', async () => {
    const dados = await requisitar('/agendamento')
    return dados.map(normalizarAgendamento)
  })
}

const somarValor = (lista) => lista.reduce((soma, agendamento) => soma + (agendamento.valorTotal ?? 0), 0)
const porInicio = (a, b) => new Date(a.dataHoraInicio) - new Date(b.dataHoraInicio)

function contarPorStatus(lista) {
  return lista.reduce(
    (acc, agendamento) => ({ ...acc, [agendamento.status]: (acc[agendamento.status] ?? 0) + 1 }),
    { confirmado: 0, pendente: 0, concluido: 0 },
  )
}

export async function buscarAgenda({ inicio, fim, dia, status }) {
  const agendamentos = await getAgendamentos()
  const doPeriodo = agendamentos.filter((a) => isWithin(a.dataHoraInicio, inicio, fim)).toSorted(porInicio)
  const doDia = agendamentos.filter((a) => isWithin(a.dataHoraInicio, startOfDay(dia), endOfDay(dia)))
  const filtrados = status === 'todos' ? doPeriodo : doPeriodo.filter((a) => a.status === status)
  const primeiraVisitaPorCliente = agendamentos.reduce((mapa, agendamento) => {
    const id = agendamento.cliente?._id
    if (!id) return mapa
    const atual = mapa.get(id)
    if (!atual || agendamento.dataHoraInicio < atual) mapa.set(id, agendamento.dataHoraInicio)
    return mapa
  }, new Map())
  const novosClientes = [...primeiraVisitaPorCliente.values()].filter((iso) => isWithin(iso, inicio, fim)).length

  return {
    agendamentos: filtrados,
    resumo: {
      dia: { total: doDia.length, porStatus: contarPorStatus(doDia) },
      totalPeriodo: doPeriodo.length,
      porStatusPeriodo: contarPorStatus(doPeriodo),
      faturamentoPrevisto: somarValor(doPeriodo),
      novosClientes,
    },
  }
}

export async function criarAgendamento(dados) {
  const resultado = await mutar('/agendamento', 'POST', dados)
  invalidarCache()
  return resultado
}

export async function atualizarAgendamento(id, dados) {
  const atualizado = await mutar(`/agendamento/${id}`, 'PATCH', dados)
  invalidarCache()
  return atualizado
}

export async function excluirAgendamento(id) {
  const resultado = await mutar(`/agendamento/${id}`, 'DELETE')
  invalidarCache()
  return resultado
}
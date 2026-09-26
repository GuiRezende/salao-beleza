import { buscarComCache, invalidarCache } from './cache.js'
import { mutar, requisitar } from './http.js'
import { normalizarCliente } from './normalizadores.js'
import { getAgendamentos } from './agendamentos.js'

function getClientes() {
  return buscarComCache('clientes', async () => {
    const dados = await requisitar('/cliente')
    return dados.map(normalizarCliente)
  })
}

const somarValor = (lista) => lista.reduce((soma, agendamento) => soma + (agendamento.valorTotal ?? 0), 0)
const porInicio = (a, b) => new Date(a.dataHoraInicio) - new Date(b.dataHoraInicio)

export async function buscarClientes() {
  const [clientes, agendamentos] = await Promise.all([getClientes(), getAgendamentos()])
  const lista = clientes.map((cliente) => {
    const historico = agendamentos
      .filter((agendamento) => agendamento.cliente?._id === cliente._id)
      .toSorted((a, b) => porInicio(b, a))
    const concluidos = historico.filter((agendamento) => agendamento.status === 'concluido')
    return {
      ...cliente,
      historico,
      quantidadeAgendamentos: historico.length,
      totalGasto: somarValor(concluidos),
    }
  })
  return lista.toSorted((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

export async function criarCliente(dados) {
  const criado = await mutar('/cliente', 'POST', dados)
  invalidarCache()
  return criado
}

export async function atualizarCliente(id, dados) {
  const atualizado = await mutar(`/cliente/${id}`, 'PATCH', dados)
  invalidarCache()
  return atualizado
}

export async function excluirCliente(id) {
  const resultado = await mutar(`/cliente/${id}`, 'DELETE')
  invalidarCache()
  return resultado
}
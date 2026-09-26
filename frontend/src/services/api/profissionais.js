import { endOfMonth, isWithin, startOfMonth } from '../../utils/dates'
import { buscarComCache, invalidarCache } from './cache.js'
import { mutar, requisitar } from './http.js'
import { normalizarProfissional } from './normalizadores.js'
import { getAgendamentos } from './agendamentos.js'

function getProfissionais() {
  return buscarComCache('profissionais', async () => {
    const dados = await requisitar('/profissional')
    return dados.map(normalizarProfissional)
  })
}

export async function buscarProfissionais(referencia = new Date()) {
  const [profissionais, agendamentos] = await Promise.all([getProfissionais(), getAgendamentos()])
  const inicio = startOfMonth(referencia)
  const fim = endOfMonth(referencia)
  const doMes = agendamentos.filter((agendamento) => isWithin(agendamento.dataHoraInicio, inicio, fim))
  return profissionais.map((profissional) => ({
    ...profissional,
    atendimentosNoMes: doMes.reduce(
      (total, agendamento) =>
        total + agendamento.servicos.filter((item) => item.profissional?._id === profissional._id).length,
      0,
    ),
  }))
}

export async function criarProfissional(dados) {
  const criado = await mutar('/profissional', 'POST', dados)
  invalidarCache()
  return criado
}

export async function atualizarProfissional(id, dados) {
  const atualizado = await mutar(`/profissional/${id}`, 'PATCH', dados)
  invalidarCache()
  return atualizado
}

export async function excluirProfissional(id) {
  const resultado = await mutar(`/profissional/${id}`, 'DELETE')
  invalidarCache()
  return resultado
}
import { buscarComCache, invalidarCache } from './cache.js'
import { mutar, requisitar } from './http.js'

function getServicos() {
  return buscarComCache('servicos', async () => {
    const dados = await requisitar('/servico')
    return dados.filter(
      (servico) => servico.nomeTipo?.trim() && Number.isFinite(servico.valor) && Number.isFinite(servico.tempoDuracao),
    )
  })
}

export function buscarServicos() {
  return getServicos()
}

export async function criarServico(dados) {
  const criado = await mutar('/servico', 'POST', dados)
  invalidarCache()
  return criado
}

export async function atualizarServico(id, dados) {
  const atualizado = await mutar(`/servico/${id}`, 'PATCH', dados)
  invalidarCache()
  return atualizado
}

export async function excluirServico(id) {
  const resultado = await mutar(`/servico/${id}`, 'DELETE')
  invalidarCache()
  return resultado
}
const API_URL = 'http://localhost:8000'

export async function requisitar(caminho) {
  const resposta = await fetch(`${API_URL}${caminho}`)
  if (!resposta.ok) throw new Error(`Erro ao consultar ${caminho}: ${resposta.status}`)
  return resposta.json()
}

export async function mutar(caminho, method, corpo) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    method,
    ...(corpo === undefined
      ? {}
      : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) }),
  })
  const texto = await resposta.text()
  if (!resposta.ok) throw new Error(texto || `Erro ao enviar para ${caminho}: ${resposta.status}`)
  try {
    return JSON.parse(texto)
  } catch {
    return { mensagem: texto }
  }
}
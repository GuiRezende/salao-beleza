const cache = new Map()

export async function buscarComCache(chave, carregar) {
  if (!cache.has(chave)) cache.set(chave, carregar())
  const requisicao = cache.get(chave)
  try {
    return await requisicao
  } catch (error) {
    if (cache.get(chave) === requisicao) cache.delete(chave)
    throw error
  }
}

export function invalidarCache() {
  cache.clear()
}
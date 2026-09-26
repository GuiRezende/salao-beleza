const MESES_CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatCurrency(valor) {
  return moeda.format(valor ?? 0)
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR')
}

export function formatDayMonth(date) {
  return `${date.getDate()} ${MESES_CURTOS[date.getMonth()]}`
}

export function formatLongDate(date) {
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function formatWeekdayShort(date) {
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
}

export function formatMonthYear(date) {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export function formatDuration(minutos) {
  if (minutos < 60) return `${minutos} min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h ${resto}min` : `${horas}h`
}

export function getInitials(nome = '') {
  const partes = nome.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes.at(-1)[0] : ''
  return `${primeira}${ultima}`.toUpperCase()
}

export function calcularIdade(iso) {
  const nascimento = new Date(iso)
  const hoje = new Date()
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
  if (aindaNaoFezAniversario) idade -= 1
  return idade
}

const DIA_EM_MS = 24 * 60 * 60 * 1000

export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(date) {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

export function addDays(date, amount) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

export function startOfWeek(date) {
  const d = startOfDay(date)
  const diasDesdeSegunda = (d.getDay() + 6) % 7
  return addDays(d, -diasDesdeSegunda)
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0))
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isWithin(iso, inicio, fim) {
  const t = new Date(iso).getTime()
  return t >= inicio.getTime() && t <= fim.getTime()
}

export function minutesToMs(minutos) {
  return minutos * 60 * 1000
}

export function daysToMs(dias) {
  return dias * DIA_EM_MS
}

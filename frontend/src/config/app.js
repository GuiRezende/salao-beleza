import { CalendarDays, Scissors, UserRound, Users, Wallet } from 'lucide-react'

export const NOME_SALAO = import.meta.env.VITE_NOME_SALAO || 'Meu Salão'

export const USUARIO_LOGADO = {
  nome: 'Guilherme Rezende',
  cargo: 'Administrador',
}

export const NAVEGACAO = [
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'profissionais', label: 'Profissionais', icon: UserRound },
  { id: 'servicos', label: 'Serviços', icon: Scissors },
  { id: 'financeiro', label: 'Financeiro', icon: Wallet },
]

import { Menu, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { NAVEGACAO, NOME_SALAO, USUARIO_LOGADO } from './config/app'
import { AgendaPage } from './pages/AgendaPage'
import { ClientesPage } from './pages/ClientesPage'
import { FinanceiroPage } from './pages/FinanceiroPage'
import { ProfissionaisPage } from './pages/ProfissionaisPage'
import { ServicosPage } from './pages/ServicosPage'

const PAGINAS = {
  agenda: AgendaPage,
  clientes: ClientesPage,
  profissionais: ProfissionaisPage,
  servicos: ServicosPage,
  financeiro: FinanceiroPage,
}

export default function App() {
  const [tela, setTela] = useState('agenda')
  const [tema, setTema] = useState('dark')
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', tema === 'dark')
    root.style.colorScheme = tema
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tema === 'dark' ? '#0a0a0a' : '#f5f5f7')
  }, [tema])

  const itemAtivo = NAVEGACAO.find((item) => item.id === tela)

  useEffect(() => {
    document.title = `${itemAtivo.label} · ${NOME_SALAO}`
  }, [itemAtivo])

  const Pagina = PAGINAS[tela]

  const navegar = (id) => {
    setTela(id)
    setMenuAberto(false)
  }

  return (
    <div className="min-h-dvh">
      <Sidebar
        salonName={NOME_SALAO}
        items={NAVEGACAO}
        activeId={tela}
        onSelect={navegar}
        user={USUARIO_LOGADO}
        theme={tema}
        onToggleTheme={() => setTema((t) => (t === 'dark' ? 'light' : 'dark'))}
        open={menuAberto}
        onClose={() => setMenuAberto(false)}
      />

      {menuAberto && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMenuAberto(false)}
          aria-label="Fechar menu"
          tabIndex={-1}
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <span className="flex items-center gap-2 font-bold">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            {NOME_SALAO}
          </span>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Pagina key={tela} />
        </main>
      </div>
    </div>
  )
}

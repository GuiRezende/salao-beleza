import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'
import { DetailPanel } from '../components/DetailPanel'
import { LoadError } from '../components/LoadError'
import { PageHeader } from '../components/PageHeader'
import { ProfessionalCard } from '../components/ProfessionalCard'
import { ProfessionalDetails } from '../components/ProfessionalDetails'
import { ProfissionalFormModal } from '../components/ProfissionalFormModal'
import { buscarProfissionais, excluirProfissional } from '../services/api'
import { formatMonthYear } from '../utils/format'

export function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [selecionadoId, setSelecionadoId] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [excluir, setExcluir] = useState(null)

  const carregar = useCallback(() => {
    buscarProfissionais(new Date()).then((lista) => {
      setProfissionais(lista)
      setErro(null)
    }).catch((error) => {
      setErro(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const selecionado = profissionais.find((p) => p._id === selecionadoId)
  const fecharPainel = useCallback(() => setSelecionadoId(null), [])
  const editarSelecionado = () => {
    setEditando(selecionado)
    fecharPainel()
    setModalAberto(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={`Equipe · ${profissionais.length} profissionais`}
        title="Profissionais"
        description={`Atendimentos contabilizados em ${formatMonthYear(new Date())}.`}
        action={<Button icon={Plus} onClick={() => { setEditando(null); setModalAberto(true) }}>Novo profissional</Button>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Lista de profissionais" aria-busy={loading}>
        {erro ? (
          <LoadError message={erro} />
        ) : loading
          ? Array.from({ length: 6 }, (_, i) => <div key={i} className="h-44 animate-pulse rounded-2xl bg-card" />)
          : profissionais.map((profissional) => (
              <ProfessionalCard key={profissional._id} profissional={profissional} onSelect={setSelecionadoId} />
            ))}
      </section>

      <DetailPanel open={Boolean(selecionado)} title="Detalhes do profissional" onClose={fecharPainel}>
        {selecionado && (
          <ProfessionalDetails
            profissional={selecionado}
            onEdit={editarSelecionado}
            onDelete={() => { setExcluir(selecionado); fecharPainel() }}
          />
        )}
      </DetailPanel>

      <ProfissionalFormModal
        key={modalAberto ? (editando ? editando._id : 'novo') : 'fechado'}
        open={modalAberto}
        profissional={editando}
        onClose={() => { setModalAberto(false); setEditando(null) }}
        onSalvo={carregar}
      />
      <ConfirmDeleteModal
        open={Boolean(excluir)}
        title="Excluir profissional"
        description={`Excluir ${excluir?.nome}? Profissionais usados em agendamentos não podem ser removidos.`}
        onClose={() => setExcluir(null)}
        onConfirm={async () => { await excluirProfissional(excluir._id); carregar() }}
      />
    </div>
  )
}

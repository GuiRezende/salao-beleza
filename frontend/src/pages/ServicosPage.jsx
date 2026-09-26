import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'
import { LoadError } from '../components/LoadError'
import { PageHeader } from '../components/PageHeader'
import { ServiceCard } from '../components/ServiceCard'
import { ServicoFormModal } from '../components/ServicoFormModal'
import { buscarServicos, excluirServico } from '../services/api'

export function ServicosPage() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [excluir, setExcluir] = useState(null)

  const carregar = useCallback(() => {
    buscarServicos().then((lista) => {
      setServicos(lista)
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

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={`Catálogo · ${servicos.length} serviços`}
        title="Serviços"
        action={<Button icon={Plus} onClick={() => { setEditando(null); setModalAberto(true) }}>Novo serviço</Button>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Lista de serviços" aria-busy={loading}>
        {erro ? (
          <LoadError message={erro} />
        ) : loading
          ? Array.from({ length: 6 }, (_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-card" />)
          : servicos.map((servico) => (
              <ServiceCard
                key={servico._id}
                servico={servico}
                onEdit={() => { setEditando(servico); setModalAberto(true) }}
                onDelete={() => setExcluir(servico)}
              />
            ))}
      </section>

      <ServicoFormModal
        key={modalAberto ? (editando ? editando._id : 'novo') : 'fechado'}
        open={modalAberto}
        servico={editando}
        onClose={() => { setModalAberto(false); setEditando(null) }}
        onSalvo={carregar}
      />
      <ConfirmDeleteModal
        open={Boolean(excluir)}
        title="Excluir serviço"
        description={`Excluir ${excluir?.nomeTipo}? Serviços usados em agendamentos não podem ser removidos.`}
        onClose={() => setExcluir(null)}
        onConfirm={async () => { await excluirServico(excluir._id); carregar() }}
      />
    </div>
  )
}

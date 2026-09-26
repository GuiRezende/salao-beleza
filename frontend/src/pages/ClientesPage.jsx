import { Plus } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { ClienteFormModal } from '../components/ClienteFormModal'
import { ClientDetails } from '../components/ClientDetails'
import { CLIENT_GRID, ClientRow } from '../components/ClientRow'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'
import { DetailPanel } from '../components/DetailPanel'
import { LoadError } from '../components/LoadError'
import { ListSkeleton } from '../components/ListSkeleton'
import { PageHeader } from '../components/PageHeader'
import { SearchInput } from '../components/SearchInput'
import { buscarClientes, excluirCliente } from '../services/api'

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [selecionadoId, setSelecionadoId] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [excluir, setExcluir] = useState(null)

  const carregar = useCallback(() => {
    buscarClientes().then((lista) => {
      setClientes(lista)
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

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim())
    if (!termo) return clientes
    return clientes.filter((c) => normalizar(c.nome).includes(termo) || c.telefone.includes(busca.trim()))
  }, [clientes, busca])

  const selecionado = clientes.find((c) => c._id === selecionadoId)
  const fecharPainel = useCallback(() => setSelecionadoId(null), [])
  const editarSelecionado = () => {
    setEditando(selecionado)
    fecharPainel()
    setModalAberto(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={`Clientes · ${clientes.length} cadastrados`}
        title="Clientes"
        action={<Button icon={Plus} onClick={() => { setEditando(null); setModalAberto(true) }}>Novo cliente</Button>}
      />

      <SearchInput value={busca} onChange={setBusca} placeholder="Buscar por nome ou telefone" label="Buscar clientes" />

      <section className="overflow-hidden rounded-2xl border border-border bg-card" aria-label="Lista de clientes">
        <div
          className={`${CLIENT_GRID} border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground`}
          aria-hidden="true"
        >
          <span>Nome</span>
          <span className="hidden md:block">Telefone</span>
          <span className="hidden md:block">Cidade</span>
          <span className="hidden md:block">Agendamentos</span>
          <span className="text-right md:text-left">Total gasto</span>
        </div>

        {erro ? (
          <LoadError message={erro} />
        ) : loading ? (
          <ListSkeleton />
        ) : filtrados.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-muted-foreground">Nenhum cliente encontrado.</p>
        ) : (
          <ul className="divide-y divide-border">
            {filtrados.map((cliente) => (
              <ClientRow key={cliente._id} cliente={cliente} onSelect={setSelecionadoId} />
            ))}
          </ul>
        )}
      </section>

      <DetailPanel open={Boolean(selecionado)} title="Detalhes do cliente" onClose={fecharPainel}>
        {selecionado && (
          <ClientDetails
            cliente={selecionado}
            onEdit={editarSelecionado}
            onDelete={() => { setExcluir(selecionado); fecharPainel() }}
          />
        )}
      </DetailPanel>

      <ClienteFormModal
        key={modalAberto ? (editando ? editando._id : 'novo') : 'fechado'}
        open={modalAberto}
        cliente={editando}
        onClose={() => { setModalAberto(false); setEditando(null) }}
        onSalvo={carregar}
      />
      <ConfirmDeleteModal
        open={Boolean(excluir)}
        title="Excluir cliente"
        description={`Excluir ${excluir?.nome}? Registros usados em agendamentos não podem ser removidos.`}
        onClose={() => setExcluir(null)}
        onConfirm={async () => { await excluirCliente(excluir._id); carregar() }}
      />
    </div>
  )
}

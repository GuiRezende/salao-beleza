import { useState } from 'react'
import { atualizarCliente, criarCliente } from '../services/api'
import { Button } from './Button'
import { FormField, Input } from './FormField'
import { Modal } from './Modal'

const VAZIO = {
  nome: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
  logradouro: '',
  numero: '',
  cidade: '',
  estado: '',
  cep: '',
}

function camposDoCliente(cliente) {
  if (!cliente) return VAZIO
  return {
    nome: cliente.nome ?? '',
    telefone: cliente.telefone ?? '',
    cpf: cliente.cpf ?? '',
    dataNascimento: cliente.dataNascimento ? new Date(cliente.dataNascimento).toISOString().slice(0, 10) : '',
    logradouro: cliente.endereco?.logradouro ?? '',
    numero: cliente.endereco?.numero ?? '',
    cidade: cliente.endereco?.cidade ?? '',
    estado: cliente.endereco?.estado ?? '',
    cep: cliente.endereco?.cep ?? '',
  }
}

export function ClienteFormModal({ open, cliente, onClose, onSalvo }) {
  const [campos, setCampos] = useState(() => camposDoCliente(cliente))
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  const alterar = (campo) => (event) => setCampos((c) => ({ ...c, [campo]: event.target.value }))

  const fechar = () => {
    if (salvando) return
    setCampos(VAZIO)
    setErro(null)
    onClose()
  }

  const enviar = async (event) => {
    event.preventDefault()
    if (!campos.nome.trim() || !campos.telefone.trim()) {
      setErro('Nome e telefone são obrigatórios.')
      return
    }
    setSalvando(true)
    setErro(null)
    try {
      const dados = {
        nome: campos.nome,
        telefone: campos.telefone,
        cpf: campos.cpf || undefined,
        dataNascimento: campos.dataNascimento || undefined,
        endereco: {
          logradouro: campos.logradouro,
          numero: campos.numero,
          cidade: campos.cidade,
          estado: campos.estado,
          cep: campos.cep,
        },
      }
      if (cliente) await atualizarCliente(cliente._id, dados)
      else await criarCliente(dados)
      setCampos(VAZIO)
      onSalvo?.()
      onClose()
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <Modal open={open} title={cliente ? 'Editar cliente' : 'Novo cliente'} onClose={fechar}>
      <form onSubmit={enviar} className="flex flex-col gap-4">
        {erro && (
          <p role="alert" className="rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
            {erro}
          </p>
        )}
        <FormField label="Nome *">
          <Input value={campos.nome} onChange={alterar('nome')} required />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Telefone *">
            <Input value={campos.telefone} onChange={alterar('telefone')} required />
          </FormField>
          <FormField label="CPF">
            <Input value={campos.cpf} onChange={alterar('cpf')} />
          </FormField>
        </div>
        <FormField label="Data de nascimento">
          <Input type="date" value={campos.dataNascimento} onChange={alterar('dataNascimento')} />
        </FormField>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Endereço</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <FormField label="Logradouro">
              <Input value={campos.logradouro} onChange={alterar('logradouro')} />
            </FormField>
          </div>
          <FormField label="Número">
            <Input value={campos.numero} onChange={alterar('numero')} />
          </FormField>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Cidade">
            <Input value={campos.cidade} onChange={alterar('cidade')} />
          </FormField>
          <FormField label="Estado">
            <Input value={campos.estado} onChange={alterar('estado')} maxLength={2} />
          </FormField>
          <FormField label="CEP">
            <Input value={campos.cep} onChange={alterar('cep')} />
          </FormField>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={fechar} disabled={salvando}>
            Cancelar
          </Button>
          <Button type="submit" disabled={salvando}>
            {salvando ? 'Salvando…' : cliente ? 'Salvar alterações' : 'Salvar cliente'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

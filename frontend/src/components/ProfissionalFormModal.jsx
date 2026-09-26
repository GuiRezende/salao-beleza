import { useState } from 'react'
import { atualizarProfissional, criarProfissional } from '../services/api'
import { Button } from './Button'
import { FormField, Input } from './FormField'
import { Modal } from './Modal'

const VAZIO = {
  nome: '',
  telefone: '',
  cpf: '',
  especialidade: '',
  salario: '',
  logradouro: '',
  numero: '',
  cidade: '',
  estado: '',
  cep: '',
}

function camposDoProfissional(profissional) {
  if (!profissional) return VAZIO
  return {
    nome: profissional.nome ?? '',
    telefone: profissional.telefone ?? '',
    cpf: profissional.cpf ?? '',
    especialidade: profissional.especialidade ?? '',
    salario: profissional.salario ?? '',
    logradouro: profissional.endereco?.logradouro ?? '',
    numero: profissional.endereco?.numero ?? '',
    cidade: profissional.endereco?.cidade ?? '',
    estado: profissional.endereco?.estado ?? '',
    cep: profissional.endereco?.cep ?? '',
  }
}

export function ProfissionalFormModal({ open, profissional, onClose, onSalvo }) {
  const [campos, setCampos] = useState(() => camposDoProfissional(profissional))
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
    if (!campos.nome.trim() || !campos.especialidade.trim()) {
      setErro('Nome e especialidade são obrigatórios.')
      return
    }
    setSalvando(true)
    setErro(null)
    try {
      const dados = {
        nome: campos.nome,
        telefone: campos.telefone || undefined,
        cpf: campos.cpf || undefined,
        especialidade: campos.especialidade,
        salario: campos.salario ? Number(campos.salario) : undefined,
        endereco: {
          logradouro: campos.logradouro,
          numero: campos.numero,
          cidade: campos.cidade,
          estado: campos.estado,
          cep: campos.cep,
        },
      }
      if (profissional) await atualizarProfissional(profissional._id, dados)
      else await criarProfissional(dados)
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
    <Modal open={open} title={profissional ? 'Editar profissional' : 'Novo profissional'} onClose={fechar}>
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
          <FormField label="Telefone">
            <Input value={campos.telefone} onChange={alterar('telefone')} />
          </FormField>
          <FormField label="CPF">
            <Input value={campos.cpf} onChange={alterar('cpf')} />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Especialidade *">
            <Input value={campos.especialidade} onChange={alterar('especialidade')} placeholder="Cabelo, Unhas..." required />
          </FormField>
          <FormField label="Salário (R$)">
            <Input type="number" min="0" step="0.01" value={campos.salario} onChange={alterar('salario')} />
          </FormField>
        </div>
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
            {salvando ? 'Salvando…' : profissional ? 'Salvar alterações' : 'Salvar profissional'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

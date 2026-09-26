import { useState } from 'react'
import { atualizarServico, criarServico } from '../services/api'
import { Button } from './Button'
import { FormField, Input } from './FormField'
import { Modal } from './Modal'

const VAZIO = { nomeTipo: '', valor: '', tempoDuracao: '' }

export function ServicoFormModal({ open, servico, onClose, onSalvo }) {
  const [campos, setCampos] = useState(() => servico ? {
    nomeTipo: servico.nomeTipo ?? '',
    valor: servico.valor ?? '',
    tempoDuracao: servico.tempoDuracao ?? '',
  } : VAZIO)
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
    if (!campos.nomeTipo.trim() || !campos.valor || !campos.tempoDuracao) {
      setErro('Preencha nome, valor e duração.')
      return
    }
    setSalvando(true)
    setErro(null)
    try {
      const dados = {
        nomeTipo: campos.nomeTipo,
        valor: Number(campos.valor),
        tempoDuracao: Number(campos.tempoDuracao),
      }
      if (servico) await atualizarServico(servico._id, dados)
      else await criarServico(dados)
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
    <Modal open={open} title={servico ? 'Editar serviço' : 'Novo serviço'} onClose={fechar}>
      <form onSubmit={enviar} className="flex flex-col gap-4">
        {erro && (
          <p role="alert" className="rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
            {erro}
          </p>
        )}
        <FormField label="Nome do serviço *">
          <Input value={campos.nomeTipo} onChange={alterar('nomeTipo')} placeholder="Corte Feminino" required />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Valor (R$) *">
            <Input type="number" min="0" step="0.01" value={campos.valor} onChange={alterar('valor')} required />
          </FormField>
          <FormField label="Duração (min) *">
            <Input type="number" min="1" step="1" value={campos.tempoDuracao} onChange={alterar('tempoDuracao')} required />
          </FormField>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={fechar} disabled={salvando}>
            Cancelar
          </Button>
          <Button type="submit" disabled={salvando}>
            {salvando ? 'Salvando…' : servico ? 'Salvar alterações' : 'Salvar serviço'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

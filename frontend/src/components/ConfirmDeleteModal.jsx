import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'

export function ConfirmDeleteModal({ open, title, description, onClose, onConfirm }) {
  const [excluindo, setExcluindo] = useState(false)
  const [erro, setErro] = useState(null)

  const fechar = () => {
    if (!excluindo) {
      setErro(null)
      onClose()
    }
  }

  const confirmar = async () => {
    setExcluindo(true)
    setErro(null)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      setErro(error.message)
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <Modal open={open} title={title} onClose={fechar}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        {erro && (
          <p role="alert" className="rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
            {erro}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={fechar} disabled={excluindo}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={confirmar}
            disabled={excluindo}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {excluindo ? 'Excluindo…' : 'Excluir'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
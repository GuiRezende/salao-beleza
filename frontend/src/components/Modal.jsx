import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function Modal({ open, title, onClose, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex max-h-[85vh] flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </dialog>
  )
}

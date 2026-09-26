import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function DetailPanel({ open, title, onClose, children }) {
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
    // Escape is handled natively by <dialog> via the close event.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md border-l border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </dialog>
  )
}

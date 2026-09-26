import { TONE_STYLES } from '../constants/status'

export function StatusBadge({ label, tone = 'neutral', showDot = true }) {
  const styles = TONE_STYLES[tone] ?? TONE_STYLES.neutral
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${styles.badge}`}
    >
      {showDot && <span className={`size-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />}
      {label}
    </span>
  )
}

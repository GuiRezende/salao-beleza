import { getInitials } from '../utils/format'

const SIZES = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
}

export function Avatar({ name, size = 'md' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary ${SIZES[size]}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}

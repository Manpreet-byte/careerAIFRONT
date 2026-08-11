import { cn } from '../../utils/cn'

export default function Badge({ children, className = '' }) {
  return <span className={cn('chip', className)}>{children}</span>
}
import { cn } from '../../utils/cn'

export default function Card({ className = '', children }) {
  return <div className={cn('card', className)}>{children}</div>
}
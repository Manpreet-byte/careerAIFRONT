import { cn } from '../../utils/cn'

export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }

  return (
    <button type={type} className={cn(styles[variant], className)} {...props}>
      {children}
    </button>
  )
}
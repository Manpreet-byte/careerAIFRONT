import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Textarea = forwardRef(function Textarea({ className = '', ...props }, ref) {
  return <textarea ref={ref} className={cn('textarea', className)} {...props} />
})

export default Textarea
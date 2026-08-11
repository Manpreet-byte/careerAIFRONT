import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Drawer({ open, title, children, onClose }) {
  return <AnimatePresence>{open && (
    <motion.div className="fixed inset-0 z-[70] bg-text/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside className="ml-auto h-full w-full max-w-md bg-cream p-7 shadow-luxury" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }} onClick={(event) => event.stopPropagation()}>
        <div className="mb-10 flex items-center justify-between"><h2 className="font-serif text-3xl">{title}</h2><button onClick={onClose} aria-label="Close drawer"><X /></button></div>
        {children}
      </motion.aside>
    </motion.div>
  )}</AnimatePresence>
}

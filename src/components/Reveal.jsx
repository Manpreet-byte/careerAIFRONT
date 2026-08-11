import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'

export default function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: fadeUp.hidden, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
    >
      {children}
    </motion.div>
  )
}

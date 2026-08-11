import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { fadeUp, stagger } from '../utils/motion'

export default function AuthShell({ eyebrow, title, text, children, footer }) {
  return (
    <motion.main initial="initial" animate="animate" exit="exit" className="min-h-screen bg-cream pt-20">
      <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1.03fr_0.97fr]">
        <div className="relative hidden overflow-hidden bg-sand lg:block">
          <motion.img
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
            src={products[0].hoverImage}
            alt="Luxury cognac leather handbag"
          />
          <div className="absolute inset-0 bg-text/18" />
          <div className="absolute bottom-10 left-10 max-w-md bg-cream/94 p-8 shadow-luxury">
            <p className="eyebrow">Private Atelier</p>
            <p className="mt-4 font-serif text-4xl leading-tight">Your leather edit, saved and cared for quietly.</p>
            <p className="mt-4 leading-7 text-text/62">Access wishlist pieces, order notes, and private client care from one refined account.</p>
          </div>
        </div>
        <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto w-full max-w-xl">
            <motion.div variants={fadeUp} className="mb-10">
              <Link to="/" className="font-serif text-3xl tracking-[0.18em]">BELLAVUE</Link>
              <p className="eyebrow mt-12">{eyebrow}</p>
              <h1 className="mt-5 font-serif text-6xl leading-none tracking-[-0.05em]">{title}</h1>
              <p className="mt-6 text-lg leading-8 text-text/62">{text}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-sand p-6 shadow-soft sm:p-8">
              {children}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-7 text-center text-sm text-text/58">{footer}</motion.p>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, stagger } from '../utils/motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-20">
      <div className="absolute left-0 top-20 h-px w-full bg-mocha/10" />
      <div className="absolute right-0 top-20 h-[78vh] w-[52vw] bg-beige/38 max-lg:hidden" />
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1500px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-2xl">
          <motion.p variants={fadeUp} className="eyebrow">Italian Leather Handbags</motion.p>
          <motion.h1 variants={fadeUp} className="mt-6 font-serif text-6xl leading-[0.9] tracking-[-0.05em] text-text sm:text-7xl lg:text-8xl">Quiet icons in warm leather.</motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-8 text-text/68">Handbags, totes, crossbodies, and travel pieces shaped with restrained Italian craftsmanship and enduring material beauty.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Link to="/collection" className="btn-primary">Explore Bags <ArrowRight size={17} /></Link>
            <Link to="/about" className="btn-secondary">Craft Story</Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-y border-mocha/10 py-6">
            {[['42','atelier steps'],['6','signature forms'],['100%','leather focus']].map(([value, label]) => <div key={label}><p className="font-serif text-4xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-text/45">{label}</p></div>)}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30, scale: 1.02 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative grid grid-cols-[0.72fr_1fr] items-end gap-5">
          <div className="space-y-5 pb-10 max-sm:hidden">
            <img className="h-64 w-full object-cover shadow-soft" src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=90" alt="Structured cognac leather tote bag" />
            <div className="bg-cream p-6 shadow-soft"><p className="eyebrow">Small Batch</p><p className="mt-3 font-serif text-2xl leading-tight">Made for patina, proportion, and daily ritual.</p></div>
          </div>
          <div className="relative">
            <img className="h-[58vh] w-full object-cover shadow-luxury sm:h-[70vh]" src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=90" alt="Luxury cognac leather handbag" />
            <div className="absolute -bottom-6 right-6 bg-cream px-6 py-5 shadow-soft"><p className="text-xs uppercase tracking-[0.22em] text-mocha">Signature Tote</p><p className="mt-2 font-serif text-2xl">Cognac calf leather</p></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

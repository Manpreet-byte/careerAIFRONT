import { motion } from 'framer-motion'
import Reveal from './Reveal'

const testimonials = [
  ['The leather has softened beautifully without losing its shape. It feels personal, not produced.', 'Elena M., Milan'],
  ['Quiet, precise, and impossibly elegant. My tote has become part of my daily uniform.', 'Claire R., New York'],
  ['Every seam feels considered. It is the rare luxury purchase that gets better with use.', 'Amara S., London'],
]

export default function TestimonialSlider() {
  return <section className="section-padding bg-sand"><div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"><Reveal className="mb-12 max-w-2xl"><p className="eyebrow">Client Notes</p><h2 className="mt-5 font-serif text-5xl">Carried, loved, lived in.</h2></Reveal><div className="grid gap-6 md:grid-cols-3">{testimonials.map(([quote, author]) => <motion.figure whileHover={{ y: -5 }} className="bg-cream p-8 shadow-soft" key={author}><blockquote className="font-serif text-3xl leading-snug">“{quote}”</blockquote><figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-mocha">{author}</figcaption></motion.figure>)}</div></div></section>
}

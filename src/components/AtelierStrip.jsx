import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { atelierImages } from '../data/products'
import Reveal from './Reveal'

export default function AtelierStrip() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section ref={ref} className="overflow-hidden bg-mocha py-24 text-cream">
      <Reveal className="mx-auto mb-12 max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-beige">Atelier Motion</p>
        <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.03em]">A moving study of grain, hands, tools, and warm Italian light.</h2>
      </Reveal>
      <motion.div style={{ x }} className="flex w-max gap-5 px-5 sm:px-8 lg:px-12">
        {[...atelierImages, ...atelierImages].map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt="Atelier detail" className="h-[360px] w-[280px] object-cover sm:h-[460px] sm:w-[360px]" />
        ))}
      </motion.div>
    </section>
  )
}

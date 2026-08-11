import { motion } from 'framer-motion'
import { BadgeCheck, PackageCheck, Sparkles } from 'lucide-react'
import Reveal from './Reveal'

const services = [
  ['Private Selection', 'A considered recommendation for your wardrobe, travel rhythm, and preferred leather tone.', Sparkles],
  ['Insured Delivery', 'Every bag ships in protective packaging with tracked, insured delivery.', PackageCheck],
  ['Lifetime Care', 'Seasonal leather guidance and repair-first support for long-term ownership.', BadgeCheck],
]

export default function LuxuryServices() {
  return (
    <section className="bg-cream px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px] border-y border-mocha/10 py-14">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow">Client Experience</p>
          <h2 className="mt-4 font-serif text-5xl tracking-[-0.03em]">The service should feel as refined as the bag.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map(([title, text, Icon]) => (
            <motion.div whileHover={{ y: -5 }} className="bg-sand p-8 text-center" key={title}>
              <Icon className="mx-auto text-leather" />
              <h3 className="mt-5 font-serif text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-text/62">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function Newsletter() {
  return <section className="bg-mocha px-5 py-24 text-cream sm:px-8 lg:px-12"><Reveal className="mx-auto max-w-3xl text-center"><p className="eyebrow text-beige">Private List</p><h2 className="mt-5 font-serif text-5xl tracking-[-0.03em]">Receive atelier notes before the season opens.</h2><form className="mx-auto mt-10 flex max-w-xl gap-3 border-b border-cream/35 pb-3"><input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-cream/55" placeholder="Email address" type="email" /><button className="flex items-center gap-2 uppercase tracking-[0.2em]">Join <ArrowRight size={16} /></button></form></Reveal></section>
}

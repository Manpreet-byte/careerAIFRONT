import Reveal from './Reveal'

export default function EditorialBanner({ eyebrow, title, text, image, reverse = false }) {
  return (
    <section className="section-padding bg-cream">
      <div className={`mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal><img className="aspect-[4/5] w-full object-cover" src={image} alt={title} /></Reveal>
        <Reveal className="max-w-xl lg:mx-auto"><p className="eyebrow">{eyebrow}</p><h2 className="mt-5 font-serif text-5xl leading-tight tracking-[-0.03em] sm:text-6xl">{title}</h2><p className="mt-6 text-lg leading-8 text-text/67">{text}</p></Reveal>
      </div>
    </section>
  )
}

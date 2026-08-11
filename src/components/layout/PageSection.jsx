export default function PageSection({ eyebrow, title, description, children, id, className = '' }) {
  return (
    <section id={id} className={`section-padding page-padding ${className}`}>
      <div className="container-wrap">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2> : null}
        {description ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate sm:text-lg">{description}</p> : null}
        {children}
      </div>
    </section>
  )
}
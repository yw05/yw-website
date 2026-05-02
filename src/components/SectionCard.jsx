function SectionCard({ title, className = '', children }) {
  return (
    <section className={`section-card ${className}`}>
      <h2>{title}</h2>
      <div className="section-card-body">{children}</div>
    </section>
  )
}

export default SectionCard

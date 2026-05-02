function SkillGrid({ groups }) {
  return (
    <section className="skills-band" aria-label="Skills">
      {groups.map((group) => (
        <div className="skill-group" key={group.title}>
          <h2>{group.title}</h2>
          <div className="skill-list">
            {group.items.map((skill) => (
              <span className="skill-chip" key={`${group.title}-${skill}`}>
                <span className="skill-icon" aria-hidden="true">
                  py
                </span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default SkillGrid

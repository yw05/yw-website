import { useEffect, useState } from 'react'
import { profile, skillGroups } from '../data/profile'
import AnimatedBackground from './AnimatedBackground'
import LiveClock from './LiveClock'
import SectionCard from './SectionCard'
import Sidebar from './Sidebar'
import SkillGrid from './SkillGrid'

function PortfolioPage() {
  const [revealState, setRevealState] = useState('hidden')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRevealState('preparing')

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setRevealState('visible')
        })
      })
    }, 3600)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <main className="site-shell">
      <AnimatedBackground />
      <div
        className={`desktop-frame is-${revealState}`}
        aria-label="Yewwei portfolio"
      >
        <Sidebar profile={profile} />

        <section className="content-panel">
          <div className="top-grid">
            <div className="name-strip">
              <span className="site-title">
                <span className="status-dot" aria-hidden="true" />
                <span>{profile.siteName}</span>
              </span>
              <LiveClock />
            </div>

            <SectionCard title="Work Experience" className="work-card">
              <div className="work-grid">
                {profile.workExperience.map((item) => (
                  <article className="work-item" key={`${item.company}-${item.role}`}>
                    <div>
                      <h3>{item.role}</h3>
                      <p>{item.company}</p>
                    </div>
                    <span>{item.date}</span>
                    {item.description?.length > 0 && (
                      <ul className="work-description">
                        {item.description.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Education">
              {profile.education.map((item) => (
                <article className="detail-item" key={item.school}>
                  <div className="education-header">
                    <h3>{item.school}</h3>
                    <span>{item.location}</span>
                  </div>
                  <div className="education-meta">
                    <p>{item.degree}</p>
                    <span>GPA: {item.gpa}</span>
                  </div>
                  {item.details?.length > 0 && (
                    <ul className="education-details">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </SectionCard>
          </div>

          <SectionCard title="Projects" className="projects-card">
            <div className="project-grid">
              {profile.projects.map((project) => (
                <article className="project-item" key={project.name}>
                  <h3>{project.name}</h3>
                  {project.tools?.length > 0 && (
                    <div className="project-tools" aria-label={`${project.name} tools`}>
                      {project.tools.map((tool) => (
                        <span key={`${project.name}-${tool}`}>{tool}</span>
                      ))}
                    </div>
                  )}
                  {project.description?.length > 0 && (
                    <ul className="project-description">
                      {project.description.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </SectionCard>

          <SkillGrid groups={skillGroups} />
        </section>
      </div>
    </main>
  )
}

export default PortfolioPage

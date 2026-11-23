import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile, skillGroups } from '../data/profile'
import SocialLinks from './SocialLinks'
import NavCard3D from './NavCard3D'
import './three/SectionParticleCanvas.css'

const SectionParticleCanvas = lazy(() => import('./three/SectionParticleCanvas'))

function ParticleVisual({kind}) {
  return <Suspense fallback={null}><SectionParticleCanvas kind={kind} /></Suspense>
}

const navigation = [
  ['about', 'About', 'A little about me'],
  ['education', 'Education', 'Always learning'],
  ['experience', 'Experience', 'Where I’ve contributed'],
  ['projects', 'Projects', 'Ideas put into practice'],
]

const navigationIcons = {
  about: <><circle cx="12" cy="7" r="3.5" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
  experience: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3" /></>,
  projects: <><path d="m12 3 10 5-10 5L2 8l10-5ZM2 13l10 5 10-5M2 18l10 5 10-5" /></>,
  education: <><path d="m1 8 11-5 11 5-11 5L1 8ZM5 10v8c4 4 10 4 14 0v-8M23 8v10" /></>,
}

function PortfolioPage() {
  const readSection = () => navigation.some(([id]) => id === window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'about'
  const [active, setActive] = useState(readSection)
  const contentRef = useRef(null)
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [active])
  useEffect(() => {
    const syncSection = () => {
      setActive(readSection())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    syncSection()
    window.addEventListener('hashchange', syncSection)
    window.addEventListener('popstate', syncSection)
    return () => {
      window.removeEventListener('hashchange', syncSection)
      window.removeEventListener('popstate', syncSection)
    }
  }, [])
  function navigate(event, id) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  return (
    <div className="site-shell dark-theme">
      <div className="portfolio-layout">
        <aside className="navigation-column">
          <p className="eyebrow">Explore</p>
          <nav className="section-navigation" aria-label="Main navigation">
            {navigation.map(([id, label, description], index) => (
              <NavCard3D key={id} href={`#${id}`} active={active === id} onClick={event => navigate(event, id)} icon={navigationIcons[id]} number={index + 1} label={label} description={description} />
            ))}
          </nav>

          <SocialLinks />
        </aside>
        <main ref={contentRef} tabIndex={0} className={`content-panel${active === 'about' ? ' about-panel' : ''}`} aria-label={navigation.find(([id]) => id === active)?.[1]}>
          {active === 'about' && (
          <section className="hero" id="about">
            <p className="eyebrow">Data science · Berkeley, California</p>
            <h1>{profile.name}</h1>
            <p className="hero-description">{profile.about}</p>
            <p className="hero-name">{profile.name} <span>— UC Berkeley</span></p>
            <div className="about-skills">{skillGroups.slice(0, 3).map(group => <div key={group.title}><h3>{group.title}</h3><div className="skill-list">{group.items.slice(0, 7).map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}</div></div>)}</div><div className="hero-bottom"><span>Data Analyst · Python, SQL & Power BI</span><a href={profile.socials.find(link => link.label === 'LinkedIn').href}>Let’s connect <span aria-hidden="true">↗</span></a></div>
          </section>
          )}
          {active === 'education' && (
          <section className="content-section section-with-particles" id="education">
            <ParticleVisual kind="education" />
            <div className="section-foreground"><h2>Education</h2>{profile.education.map(item => <article className="education-item" key={item.school}><div className="school-mark" aria-hidden="true">{item.mark}</div><div><h3>{item.school}</h3><p>{item.degree}</p><p className="education-location">{item.location}{item.graduation && ` | ${item.graduation}`}</p>{item.details.length > 0 && <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}</div><div className="education-gpa"><span>GPA</span><strong>{item.gpa}</strong></div></article>)}</div>
          </section>
          )}
          {active === 'experience' && (
          <section className="content-section section-with-particles" id="experience">
            <ParticleVisual kind="experience" />
            <div className="section-foreground">
            <h2>Experience</h2>
            <div className="work-grid experience-timeline">{profile.workExperience.map((item, index) => <article className="work-item" key={`${item.company}-${index}`}><p className="item-date">{item.date}</p><h3>{item.role}</h3><p className="company">{item.company} · {item.location}</p></article>)}</div>
          </div>
          </section>
          )}
          {active === 'projects' && (
          <section className="content-section section-with-particles" id="projects">
            <ParticleVisual kind="projects" />
            <div className="section-foreground">
            <h2>Projects</h2>
            <div className="project-grid">{profile.projects.map((project, index) => <article className="project-item" key={project.name}><div className={`project-art art-${index}`} aria-hidden="true">{index === 0 ? <><i /><i /><i /><i /><i /><i /></> : <><div className="lock-icon">⌂</div></>}</div><div className="project-content"><p className="eyebrow">{project.category}</p><h3>{project.name}</h3><div className="project-tools">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><ul>{project.description.map(point => <li key={point}>{point}</li>)}</ul><a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel || 'View project'}</a></div></article>)}</div>
          </div>
          </section>
          )}
          <footer><span>© {new Date().getFullYear()} {profile.name}</span><a href="#about" onClick={event => navigate(event, 'about')}>About</a></footer>
        </main>
      </div>
    </div>
  )
}
export default PortfolioPage

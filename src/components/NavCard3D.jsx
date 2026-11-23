import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './NavCard3D.css'

const timing = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }

export default function NavCard3D({ href, active, onClick, icon, number, label, description }) {
  const prefersReducedMotion = useReducedMotion()
  // Local QA can exercise animation without changing the OS accessibility setting.
  const previewMotion = import.meta.env.DEV && new URLSearchParams(window.location.search).get('motion-preview') === '1'
  const reduceMotion = prefersReducedMotion && !previewMotion
  const [angle, setAngle] = useState(24)
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)')
    const tablet = window.matchMedia('(max-width: 1050px)')
    const update = () => setAngle(mobile.matches ? 0 : tablet.matches ? 18 : 24)
    update()
    mobile.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => {
      mobile.removeEventListener('change', update)
      tablet.removeEventListener('change', update)
    }
  }, [])
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const engaged = hovered || focused
  return (
    <div data-motion-preview={previewMotion} className={`nav-card-perspective${engaged ? ' is-engaged' : ''}`}
      onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true) }}
      onPointerLeave={() => setHovered(false)}>
      <motion.a href={href} className={`nav-card-3d${active ? ' is-active' : ''}`}
        aria-current={active ? 'location' : undefined} onClick={onClick}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        initial={false}
        animate={{ rotateY: engaged ? 0 : angle, scale: reduceMotion ? 1 : engaged ? 1.02 : 1 }}
        transition={reduceMotion ? { ...timing, duration: 0.25 } : timing}
        style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}>
        <motion.span className="nav-card-side" aria-hidden="true" initial={false}
          animate={{ opacity: engaged || angle === 0 ? 0 : 1 }} transition={reduceMotion ? { duration: 0 } : timing} />
        <span className="nav-card-front">
          <svg className="nav-card-icon" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
          <span className="nav-card-number">{String(number).padStart(2, '0')}</span>
          <span className="nav-card-copy"><strong>{label}</strong><small>{description}</small></span>
        </span>
      </motion.a>
    </div>
  )
}







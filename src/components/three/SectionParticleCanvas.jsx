import { Component, Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import EducationParticles from './EducationParticles'
import ExperienceParticles from './ExperienceParticles'
import ProjectsParticles from './ProjectsParticles'
import './SectionParticleCanvas.css'

const models = { education: EducationParticles, experience: ExperienceParticles, projects: ProjectsParticles }
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}
function HoverModel({ kind, hovering }) {
  const group = useRef()
  const speed = useRef(0)
  const Model = models[kind]
  useFrame((_, delta) => {
    const dt = Math.min(delta, .05)
    speed.current += ((hovering.current ? .45 : 0) - speed.current) * (1 - Math.exp(-dt * 5))
    if (group.current) group.current.rotation.y += speed.current * dt
  })
  return <group ref={group}><Model reducedMotion={false} /></group>
}
export default function SectionParticleCanvas({ kind }) {
  const container = useRef(null)
  const hovering = useRef(false)
  useEffect(() => {
    const track = event => {
      const rect = container.current?.getBoundingClientRect()
      hovering.current = Boolean(rect && event.clientX >= Math.max(rect.left, window.innerWidth * .58) && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)
    }
    const leave = () => { hovering.current = false }
    window.addEventListener('pointermove', track, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    return () => {
      window.removeEventListener('pointermove', track)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
    }
  }, [])
  return <div ref={container} className={`section-particle-background visual-${kind}`} aria-hidden="true">
    <SceneBoundary key={kind}>
      <Canvas dpr={[1, 1.5]} camera={{ position: kind === 'education' ? [3, .5, 12.8] : [3, 1.5, 9.5], fov: 42 }} gl={{ antialias: true, alpha: true }} fallback={null}>
        <Suspense fallback={null}><HoverModel kind={kind} hovering={hovering} /></Suspense>
      </Canvas>
    </SceneBoundary>
  </div>
}

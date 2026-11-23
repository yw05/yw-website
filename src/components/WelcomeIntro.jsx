import { useEffect, useRef, useState } from 'react'
import './WelcomeIntro.css'

export default function WelcomeIntro() {
  const canvasRef = useRef(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return undefined

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return undefined
    let width, height, frame
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const start = performance.now()
    const draw = now => {
      const elapsed = (now - start) / 1000
      const spiral = Math.min(1, Math.max(0, (elapsed - 1.8) / 2.1))
      context.clearRect(0, 0, width, height)
      const count = width < 700 ? 170 : 330
      for (let i = 0; i < count; i++) {
        const seed = i * 2.399963
        const radius = Math.sqrt((i + 1) / count) * Math.hypot(width, height) * 0.58
        const angle = seed + elapsed * 0.16 + spiral * spiral * 7
        const flowX = ((i * 137.5 + elapsed * (25 + i % 30)) % (width + 100)) - 50
        const flowY = height * (0.5 + Math.sin(seed + elapsed * 0.5) * 0.46)
        const spiralX = width / 2 + Math.cos(angle) * radius * (1 - spiral)
        const spiralY = height / 2 + Math.sin(angle) * radius * (1 - spiral) * 0.65
        const mix = Math.min(1, spiral * 3)
        const x = flowX * (1 - mix) + spiralX * mix
        const y = flowY * (1 - mix) + spiralY * mix
        context.beginPath()
        context.fillStyle = `rgba(210,173,110,${(0.25 + (i % 7) / 10) * (1 - spiral * 0.7)})`
        context.arc(x, y, 0.8 + i % 3 * 0.55, 0, Math.PI * 2)
        context.fill()
      }
      if (elapsed < 4.5) frame = requestAnimationFrame(draw)
      else setFinished(true)
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [finished])

  if (finished) return <button className="replay-intro" type="button" onClick={() => setFinished(false)}>Replay welcome</button>
  return <div className="welcome-intro" role="region" aria-label="Welcome to Yewei Wang's portfolio">
    <canvas ref={canvasRef} aria-hidden="true" />
    <div className="welcome-copy"><p>Welcome to my world</p><h2>Yewei Wang</h2><span>Curiosity in motion.</span></div>
    <button type="button" onClick={() => setFinished(true)}>Skip intro</button>
  </div>
}

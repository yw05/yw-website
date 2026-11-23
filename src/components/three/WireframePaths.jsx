import { useMemo } from 'react'
import ParticleCloud from './ParticleCloud'

export default function WireframePaths({ paths, color = '#9baaa0', opacity = .7, reducedMotion = false }) {
  const positions = useMemo(() => {
    const points = []
    for (const path of paths) {
      for (let i = 1; i < path.length; i++) {
        const from = path[i - 1], to = path[i]
        const distance = Math.hypot(...to.map((value, axis) => value - from[axis]))
        const steps = Math.max(1, Math.ceil(distance / .045))
        for (let step = 0; step < steps; step++) {
          const t = step / steps
          points.push(...from.map((value, axis) => value + (to[axis] - value) * t))
        }
      }
    }
    return points
  }, [paths])
  return <ParticleCloud positions={positions} color={color} opacity={Math.min(1, opacity * 1.8)} size={7} reducedMotion={reducedMotion} />
}

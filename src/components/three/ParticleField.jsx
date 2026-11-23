import { useMemo } from 'react'
import ParticleCloud from './ParticleCloud'
import { seededRandom } from './particleUtils'

export default function ParticleField({ reducedMotion }) {
  const particles=useMemo(()=>{
    const random=seededRandom(87),points=[]
    for(let i=0;i<180;i++)points.push((random()-.5)*9,(random()-.5)*6,(random()-.5)*4-1.5)
    return points
  },[])
  return <ParticleCloud positions={particles} color="#7B8FA4" opacity={.26} size={3} reducedMotion={reducedMotion} />
}

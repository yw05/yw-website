import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import WireframePaths from './WireframePaths'
import { circle, limb, outlineBox, segment } from './wireframeUtils'

export default function ExperienceParticles({reducedMotion}) {
  const handsRef=useRef()
  const [body,desk,hands,data]=useMemo(()=>{
    const body=[],desk=[],hands=[],data=[]
    circle(body,[-1.04,1.26,0],.34,'xy',[.9,1.12])
    circle(body,[-1.04,1.26,0],.34,'yz',[.87,1.12])
    circle(body,[-1.04,1.26,0],.34,'xz',[.9,.87])
    limb(body,[-1.08,.98,0],[-1.1,.78,0],.1)
    limb(body,[-1.08,.74,0],[-1.2,-.38,0],.3)
    for(const z of [-.32,.32]) {
      limb(body,[-1.08,.72,z],[-.65,.02,z*1.25],.09)
      limb(body,[-.65,.02,z*1.25],[.1,.12,z],.065)
      limb(hands,[.1,.12,z],[.3,.1,z],.065)
      for(let i=0;i<4;i++) {
        const fingerZ=z-.055+i*.037
        hands.push([[.27,.11,fingerZ],[.37,.105,fingerZ],[.42,.07,fingerZ]])
      }
      limb(body,[-1.15,-.43,z*.7],[-.5,-.81,z],.135)
      limb(body,[-.5,-.81,z],[-.44,-1.76,z],.105)
      outlineBox(body,[-.3,-1.82,z],[.42,.13,.21])
    }
    outlineBox(desk,[-1.2,-.62,0],[.86,.12,.9])
    outlineBox(desk,[-1.5,-.02,0],[.09,1.12,.85])
    segment(desk,[-1.2,-.7,0],[-1.2,-1.94,0])
    for(const z of [-.56,.56])segment(desk,[-1.2,-1.94,0],[-1.65,-1.94,z])
    outlineBox(desk,[.75,-.08,0],[2.1,.1,1.8])
    for(const x of [-.13,1.65])for(const z of [-.72,.72])segment(desk,[x,-.13,z],[x,-1.94,z])
    outlineBox(desk,[.3,.01,0],[.64,.035,1.06])
    for(let i=0;i<5;i++)segment(desk,[.05+i*.12,.035,-.48],[.05+i*.12,.035,.48])
    for(let i=0;i<10;i++)segment(desk,[.05,.035,-.45+i*.1],[.54,.035,-.45+i*.1])
    outlineBox(desk,[1.28,1.03,0],[.09,1.03,1.35])
    outlineBox(desk,[1.28,.14,0],[.45,.075,.66])
    limb(desk,[1.28,.18,0],[1.28,.56,0],.04)
    data.push([[.3,.05,0],[.7,.08,0],[1.22,.5,0],[1.22,1,0]])
    return [body,desk,hands,data]
  },[])
  useFrame(({clock})=>{
    if(handsRef.current) {
      handsRef.current.position.y=Math.sin(clock.elapsedTime*(reducedMotion?.6:3.5))*.009
      handsRef.current.rotation.x=Math.sin(clock.elapsedTime*(reducedMotion?.5:2.9))*.018
    }
  })
  return <group scale={1.2} rotation={[0,-.2,0]} position={[0,.1,0]}>
    <WireframePaths paths={body} color="#8292A5" opacity={.68} signals={5} speed={.035} reducedMotion={reducedMotion}/>
    <WireframePaths paths={desk} color="#718399" opacity={.58} signals={7} speed={.04} reducedMotion={reducedMotion}/>
    <group ref={handsRef}><WireframePaths paths={hands} color="#BDA477" opacity={.74} signals={2} speed={.08} reducedMotion={reducedMotion}/></group>
    <WireframePaths paths={data} color="#7B8FA4" opacity={.15} signals={3} speed={.12} reducedMotion={reducedMotion}/>

  </group>
}

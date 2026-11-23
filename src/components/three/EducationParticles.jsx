import { useMemo } from 'react'
import WireframePaths from './WireframePaths'
import { circle, outlineBox, rectangle, segment } from './wireframeUtils'

function architecture() {
  const structure=[],detail=[],gold=[]
  const half=.55
  const face=(u,y,depth,side)=>side<2?[u,y,depth*(side===0?1:-1)]:[depth*(side===2?1:-1),y,u]
  outlineBox(structure,[0,-.77,0],[1.1,4.62,1.1])
  for(const y of [-3.2,-3.09,-2.94,1.58,1.7,2.47,2.62,3.28,3.42])outlineBox(structure,[0,y,0],[y<-2.9?1.43:1.34,.07,y<-2.9?1.43:1.34])
  for(let side=0;side<4;side++) {
    const plane=side<2?'xy':'yz'
    // Recessed shaft panels and narrow windows give the shaft its vertical rhythm.
    rectangle(detail,face(0,-.75,.557,side),.87,4.29,plane)
    rectangle(detail,face(0,-.75,.56,side),.79,4.14,plane)
    for(const y of [-2.35,-1.63,-.91,-.19,.53]) {
      rectangle(structure,face(0,y,.563,side),.075,.31,plane)
      rectangle(detail,face(0,y,.566,side),.105,.34,plane)
    }
    for(let y=-2.85;y<1.4;y+=.24)segment(detail,face(-.53,y,.554,side),face(.53,y,.554,side))
    // Clock panels sit below the loggia, framed by distinct cornices.
    rectangle(structure,face(0,2.08,.555,side),1.1,.68,plane)
    for(const r of [.225,.252,.267])circle(r===.225?gold:structure,face(0,2.08,.566,side),r,plane)
    for(let i=0;i<60;i++) {
      const a=i/60*Math.PI*2, inner=i%5===0?.185:.205
      segment(detail,face(Math.sin(a)*inner,2.08+Math.cos(a)*inner,.57,side),face(Math.sin(a)*.22,2.08+Math.cos(a)*.22,.57,side))
    }
    segment(gold,face(0,2.08,.575,side),face(.13,2.16,.575,side))
    segment(gold,face(0,2.08,.575,side),face(-.035,2.255,.575,side))
    // Three open arches with explicit piers, capitals and suspended bells.
    for(const x of [-.54,-.18,.18,.54]) {
      segment(structure,face(x,2.68,.54,side),face(x,3.13,.54,side))
      for(const y of [2.7,3.12])rectangle(detail,face(x,y,.548,side),.095,.045,plane)
    }
    for(const x of [-.36,0,.36]) {
      for(const r of [.13,.15])structure.push(Array.from({length:31},(_,i)=>face(x+Math.cos(i/30*Math.PI)*r,3.1+Math.sin(i/30*Math.PI)*r,.545,side)))
      segment(detail,face(x,3.08,.46,side),face(x,2.97,.46,side))
      gold.push([face(x-.06,2.83,.46,side),face(x-.045,2.94,.46,side),face(x,2.97,.46,side),face(x+.045,2.94,.46,side),face(x+.06,2.83,.46,side),face(x-.06,2.83,.46,side)])
    }
    for(let x=-.58;x<.59;x+=.095)segment(detail,face(x,2.51,.59,side),face(x,2.63,.59,side))
    // Roof drum, stepped eaves, pitched roof panels and finial.
    rectangle(structure,face(0,3.58,.5,side),1,.22,plane)
    for(const x of [-.66,.66])segment(structure,face(x,3.72,.66,side),[0,4.88,0])
    for(const t of [.16,.35,.55,.75]) {
      const w=1.32*(1-t)
      segment(detail,face(-w/2,3.72+t*1.16,w/2,side),face(w/2,3.72+t*1.16,w/2,side))
    }
    // A small doorway and inset panels articulate the base.
    rectangle(structure,face(0,-2.72,.561,side),.24,.42,plane)
    segment(detail,face(0,-2.91,.567,side),face(0,-2.52,.567,side))
  }
  outlineBox(structure,[0,3.72,0],[1.35,.07,1.35])
  segment(gold,[0,4.88,0],[0,5.11,0])
  circle(gold,[0,5.02,0],.035,'xy')
  rectangle(detail,[0,-3.27,0],3.4,3.4,'xz')
  return [structure,detail,gold]
}
export default function EducationParticles({reducedMotion}) {
  const [structure,detail,gold]=useMemo(architecture,[])
  return <group position={[0,-.88,0]} rotation={[0,-.18,0]}>
    <WireframePaths paths={structure} color="#7B8FA4" opacity={.73} signals={13} speed={.035} reducedMotion={reducedMotion}/>
    <WireframePaths paths={detail} color="#657487" opacity={.38} signals={4} speed={.022} reducedMotion={reducedMotion}/>
    <WireframePaths paths={gold} color="#BDA477" opacity={.62} signals={5} speed={.025} reducedMotion={reducedMotion}/>
  </group>
}

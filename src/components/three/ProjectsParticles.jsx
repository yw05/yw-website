import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import WireframePaths from './WireframePaths'
import { circle } from './wireframeUtils'

const signalCount=18
const signalSpeed=.065
export default function ProjectsParticles({reducedMotion}) {
  const nodesRef=useRef()
  const {edges,rings,positions,colors,targets}=useMemo(()=>{
    const counts=[3,5,6,5,2],layers=[],nodes=[],edges=[],rings=[],targets=[]
    for(let layer=0;layer<counts.length;layer++) {
      const indices=[]
      for(let i=0;i<counts[layer];i++) {
        const position=[(layer-2)*1.4,(i-(counts[layer]-1)/2)*.62,Math.sin(i*1.1+layer*.7)*.75]
        indices.push(nodes.length);nodes.push(position)
        circle(rings,position,.055,'xy',[1,1],16)
      }
      layers.push(indices)
    }
    for(let layer=0;layer<layers.length-1;layer++)for(const a of layers[layer])for(const b of layers[layer+1]) {
      edges.push([nodes[a],nodes[b]]);targets.push(b)
    }
    return {edges,rings,targets,positions:new Float32Array(nodes.flat()),colors:new Float32Array(nodes.length*3).fill(.4)}
  },[])
  useFrame(({clock})=>{
    const attribute=nodesRef.current?.geometry.attributes.color
    if(!attribute)return
    const time=clock.elapsedTime*(reducedMotion?.15:1)
    for(let i=0;i<positions.length/3;i++)attribute.setXYZ(i,.4,.46,.53)
    for(let i=0;i<signalCount;i++) {
      const t=(time*signalSpeed+i*.137)%1
      if(t>.85) {
        const target=targets[(i*13)%edges.length],brightness=Math.sin((t-.85)/.15*Math.PI)
        attribute.setXYZ(target,.4+.43*brightness,.46+.27*brightness,.53+.05*brightness)
      }
    }
    attribute.needsUpdate=true
  })
  return <group rotation={[.04,-.15,0]}>
    <WireframePaths paths={edges} color="#7B8FA4" opacity={.3} signals={signalCount} speed={signalSpeed} reducedMotion={reducedMotion}/>
    <WireframePaths paths={rings} color="#9DA8AB" opacity={.7} signals={0} reducedMotion={reducedMotion}/>
    <points ref={nodesRef}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/><bufferAttribute attach="attributes-color" args={[colors,3]}/></bufferGeometry>
      <shaderMaterial transparent depthWrite={false} vertexColors
        vertexShader={`varying vec3 vColor;void main(){vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=4.5;}`}
        fragmentShader={`varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,smoothstep(.5,.1,d)*.8);}`}/>
    </points>
  </group>
}

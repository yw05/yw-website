import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import { AdditiveBlending, Color } from 'three'

const vertex = `
  uniform float uTime;
  uniform float uMotion;
  uniform float uSize;
  uniform float uDrift;
  varying float vBrightness;
  void main() {
    float phase = dot(position, vec3(3.7, 5.1, 7.3));
    float wander = step(.95, fract(sin(phase*12.9898)*43758.5453));
    float amplitude = mix(.003, .035, wander)*uMotion;
    vec3 p = position + vec3(sin(uTime*.21+phase), cos(uTime*.18+phase), sin(uTime*.16+phase))*amplitude;
    if(uDrift>.5 && uMotion>.5) p.y = mod(position.y+2.8+uTime*.09,6.6)-2.8;
    vBrightness = .86 + .14*sin(phase + uTime*.35*uMotion);
    vec4 viewPosition = modelViewMatrix*vec4(p, 1.0);
    gl_Position = projectionMatrix*viewPosition;
    gl_PointSize = clamp(uSize*(4.0/-viewPosition.z), 1.2, 4.0);
  }`
const fragment = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vBrightness;
  void main() {
    float distanceFromCenter = length(gl_PointCoord-vec2(.5));
    if(distanceFromCenter>.5) discard;
    float alpha = smoothstep(.5,.05,distanceFromCenter)*vBrightness*uOpacity;
    gl_FragColor = vec4(uColor*vBrightness, alpha);
  }`

export default function ParticleCloud({ positions, color = '#dfc48d', size = 3.5, opacity = .7, drift = false, reducedMotion, ...props }) {
  const material = useRef()
  const buffer = useMemo(() => new Float32Array(positions), [positions])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uDrift: { value: drift ? 1 : 0 }, uMotion: { value: reducedMotion ? 0 : 1 }, uSize: { value: size }, uOpacity: { value: opacity }, uColor: { value: new Color(color) } }), [color, size, opacity, drift, reducedMotion])
  useFrame(({ clock }) => { if (material.current && !reducedMotion) material.current.uniforms.uTime.value = clock.elapsedTime })
  return <Points positions={buffer} stride={3} frustumCulled={false} {...props}>
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} transparent depthWrite={false} blending={AdditiveBlending} />
  </Points>
}


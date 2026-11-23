// Deterministic sampling keeps silhouettes stable across renders and devices.
export function seededRandom(seed = 19) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
}
export function line(points, from, to, count = 30, spread = 0) {
  const random = seededRandom(points.length + 1)
  for (let i = 0; i <= count; i++) {
    const t = i / count
    points.push(...from.map((value, axis) => value + (to[axis] - value) * t + (random() - .5) * spread))
  }
}
export function box(points, center, size, step = .085, filter = () => true) {
  for (let face = 0; face < 3; face++) {
    const axes = [0, 1, 2].filter(axis => axis !== face)
    const [a, b] = axes
    for (const sign of [-1, 1]) {
      for (let i = 0; i <= Math.ceil(size[a] / step); i++) {
        for (let j = 0; j <= Math.ceil(size[b] / step); j++) {
          const p = [...center]
          p[face] += sign * size[face] / 2
          p[a] += (i / Math.ceil(size[a] / step) - .5) * size[a]
          p[b] += (j / Math.ceil(size[b] / step) - .5) * size[b]
          if (filter(p, face)) points.push(...p)
        }
      }
    }
  }
}
export function ring(points, center, radius, count = 100, plane = 'xy') {
  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2
    const p = [...center]
    const [a, b] = plane === 'xz' ? [0, 2] : plane === 'yz' ? [1, 2] : [0, 1]
    p[a] += Math.cos(angle) * radius
    p[b] += Math.sin(angle) * radius
    points.push(...p)
  }
}
export function sphere(points, center, radius, count = 600, scale = [1, 1, 1]) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - i / (count - 1) * 2
    const r = Math.sqrt(1 - y * y)
    points.push(center[0] + Math.cos(i * golden) * r * radius * scale[0], center[1] + y * radius * scale[1], center[2] + Math.sin(i * golden) * r * radius * scale[2])
  }
}
export function tube(points, start, end, radius, count = 28) {
  // Rings perpendicular to the bone axis make limbs legible from several angles.
  const direction = end.map((v, i) => v - start[i])
  const length = Math.hypot(...direction)
  const d = direction.map(v => v / length)
  const helper = Math.abs(d[1]) > .9 ? [1, 0, 0] : [0, 1, 0]
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
  let u = cross(d, helper); const l = Math.hypot(...u); u = u.map(v => v/l)
  const v = cross(d, u)
  for (let i = 0; i <= count; i++) for (let j = 0; j < 12; j++) {
    const a = j / 12 * Math.PI * 2
    points.push(...start.map((p, k) => p + direction[k]*i/count + radius*(Math.cos(a)*u[k]+Math.sin(a)*v[k])))
  }
}

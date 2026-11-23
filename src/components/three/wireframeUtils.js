// Every path is an ordered polyline, shared by outlines and traveling signals.
export function segment(paths,a,b) { paths.push([a,b]) }
export function rectangle(paths,center,width,height,plane='xy') {
  const axes=plane==='xy'?[0,1]:plane==='xz'?[0,2]:[2,1]
  const corners=[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([u,v])=>{
    const p=[...center];p[axes[0]]+=u*width/2;p[axes[1]]+=v*height/2;return p
  })
  paths.push(corners)
}
export function outlineBox(paths,center,size) {
  for(let axis=0;axis<3;axis++) {
    const other=[0,1,2].filter(i=>i!==axis)
    for(const a of [-1,1])for(const b of [-1,1]) {
      const start=[...center],end=[...center]
      start[axis]-=size[axis]/2;end[axis]+=size[axis]/2
      start[other[0]]+=a*size[other[0]]/2;end[other[0]]=start[other[0]]
      start[other[1]]+=b*size[other[1]]/2;end[other[1]]=start[other[1]]
      segment(paths,start,end)
    }
  }
}
export function circle(paths,center,radius,plane='xy',scale=[1,1],count=72) {
  const axes=plane==='xy'?[0,1]:plane==='xz'?[0,2]:[2,1]
  paths.push(Array.from({length:count+1},(_,i)=>{
    const angle=i/count*Math.PI*2,p=[...center]
    p[axes[0]]+=Math.cos(angle)*radius*scale[0];p[axes[1]]+=Math.sin(angle)*radius*scale[1]
    return p
  }))
}
export function limb(paths,a,b,radius) {
  const d=b.map((v,i)=>v-a[i]),length=Math.hypot(...d),n=d.map(v=>v/length)
  const helper=Math.abs(n[1])>.9?[1,0,0]:[0,1,0]
  const cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]]
  let u=cross(n,helper);const l=Math.hypot(...u);u=u.map(v=>v/l);const v=cross(n,u)
  const ring=center=>Array.from({length:17},(_,i)=>center.map((p,k)=>p+radius*(Math.cos(i/16*Math.PI*2)*u[k]+Math.sin(i/16*Math.PI*2)*v[k])))
  const first=ring(a),last=ring(b);paths.push(first,last)
  for(const i of [0,4,8,12])segment(paths,first[i],last[i])
}

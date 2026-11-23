import { useEffect, useRef } from 'react'
import './GlowingCursor.css'

export default function GlowingCursor() {
  const cursorRef=useRef()
  const dotRef=useRef()
  useEffect(()=>{
    const fine=window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
    const cursor=cursorRef.current, dot=dotRef.current
    let frame=0, target={x:0,y:0}, position={x:0,y:0}, shown=false
    const draw=()=>{
      const fraction=reduced.matches?1:.24
      position.x+=(target.x-position.x)*fraction
      position.y+=(target.y-position.y)*fraction
      cursor.style.transform=`translate3d(${position.x}px,${position.y}px,0)`
      if(Math.abs(position.x-target.x)+Math.abs(position.y-target.y)>.1) frame=requestAnimationFrame(draw)
      else frame=0
    }
    const hide=()=>{cursor.dataset.visible='false';dot.dataset.visible='false';shown=false}
    const move=event=>{
      if(!fine.matches || event.pointerType==='touch')return
      target={x:event.clientX,y:event.clientY}
      if(!shown){position={...target};shown=true}
      cursor.dataset.visible='true';dot.dataset.visible='true'
      dot.style.transform=`translate3d(${target.x}px,${target.y}px,0)`
      cursor.dataset.interactive=Boolean(event.target.closest('a,button,input,textarea,select,[role="button"]'))
      if(!frame)frame=requestAnimationFrame(draw)
    }
    const change=()=>{
      document.documentElement.classList.toggle('has-glowing-cursor',fine.matches)
      if(!fine.matches)hide()
    }
    change()
    fine.addEventListener('change',change)
    window.addEventListener('pointermove',move,{passive:true})
    document.addEventListener('pointerleave',hide)
    window.addEventListener('blur',hide)
    return ()=>{
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-glowing-cursor')
      fine.removeEventListener('change',change)
      window.removeEventListener('pointermove',move)
      document.removeEventListener('pointerleave',hide)
      window.removeEventListener('blur',hide)
    }
  },[])
  return <><div ref={cursorRef} className="glowing-cursor-ring" aria-hidden="true"><span /></div><div ref={dotRef} className="glowing-cursor-dot" aria-hidden="true"><span /></div></>
}

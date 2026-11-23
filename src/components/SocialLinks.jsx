import { createPortal } from 'react-dom'
﻿import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { SOCIAL_ICONS } from './Sidebar'
import './SocialLinks.css'

const labels = { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline' }
export default function SocialLinks() {
  const [presence, setPresence] = useState(null)
  const [toast, setToast] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const timer = useRef(null)
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${profile.discordUserId}`, { signal: controller.signal })
        const result = await response.json()
        if (!controller.signal.aborted) setPresence(response.ok && result.success ? result.data : null)
      } catch { if (!controller.signal.aborted) setPresence(null) }
    }
    load()
    const interval = window.setInterval(load, 30000)
    return () => { controller.abort(); window.clearInterval(interval); window.clearTimeout(timer.current) }
  }, [])
  function notify(message, error = false) {
    window.clearTimeout(timer.current)
    setToast({ message, error })
    timer.current = window.setTimeout(() => setToast(null), 4000)
  }
  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText('r1g4')
      notify('Discord username copied: r1g4')
    } catch { notify('Could not copy. Discord username: r1g4', true) }
  }
  async function downloadCV(event, link) {
    event.preventDefault()
    if (downloading) return
    setDownloading(true)
    try {
      const response = await fetch(link.href)
      if (!response.ok) throw new Error('Missing resume')
      const blob = await response.blob()
      if (!(await blob.slice(0, 5).text()).startsWith('%PDF-')) throw new Error('Not a PDF')
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = link.download
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 10000)
      notify('CV download started')
    } catch { notify('CV is not available yet. Please try again later.', true) }
    finally { setDownloading(false) }
  }
  const user = presence?.discord_user
  const avatar = user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128` : null
  const status = presence?.discord_status
  return <>
    <nav className="social-links sidebar-socials" aria-label="Social links">
      {profile.socials.filter(link => link.label !== 'Discord').map(link => <a key={link.label} href={link.href} download={link.download} onClick={link.download ? event => downloadCV(event, link) : undefined} aria-label={link.download ? 'Download CV' : link.label} title={link.download ? 'Download CV' : link.label} aria-busy={link.download ? downloading : undefined}>{SOCIAL_ICONS[link.label] || link.shortLabel}</a>)}
      <div className="discord-social">
        <button className="discord-copy" type="button" onClick={copyDiscord} aria-label="Copy Discord username r1g4" aria-describedby="discord-profile-bubble">{SOCIAL_ICONS.Discord}</button>
        <div className="discord-bubble" id="discord-profile-bubble" role="tooltip">
          <div className="discord-bubble-label">{SOCIAL_ICONS.Discord}<span>Discord</span></div>
          <div className="discord-bubble-profile"><div className="discord-bubble-avatar">{avatar ? <img src={avatar} alt="" /> : profile.initials}<span className={`discord-bubble-status ${status || 'unknown'}`} /></div><div><strong>r1g4</strong><span>{labels[status] || 'Status unavailable'}</span></div></div>
          <p>Click to copy username</p>
        </div>
      </div>
    </nav>
    {createPortal(<div className={`social-toast${toast ? ' is-visible' : ''}${toast?.error ? ' is-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toast && <><span>{toast.message}</span><button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification">&times;</button></>}</div>, document.body)}
  </>
}

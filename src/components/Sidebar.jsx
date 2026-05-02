import { useEffect, useMemo, useState } from 'react'

const STATUS_LABELS = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
}

const SOCIAL_ICONS = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.111.82-.26.82-.577 0-.285-.011-1.232-.017-2.234-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.204.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.469-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.093c1.019.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.805 5.625-5.478 5.922.43.371.823 1.102.823 2.222 0 1.606-.015 2.9-.015 3.296 0 .319.216.694.825.576C20.565 22.092 24 17.597 24 12.297c0-6.627-5.373-12-12-12Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.75 5.25h16.5A2.25 2.25 0 0 1 22.5 7.5v9a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 16.5v-9a2.25 2.25 0 0 1 2.25-2.25Zm.42 1.5 7.08 5.34c.44.33 1.06.33 1.5 0l7.08-5.34H4.17Zm16.83 1.5-7.35 5.54a2.75 2.75 0 0 1-3.3 0L3 8.25v8.25c0 .41.34.75.75.75h16.5c.41 0 .75-.34.75-.75V8.25Z" />
    </svg>
  ),
}

function getAvatarUrl(user) {
  if (!user?.avatar) {
    return null
  }

  const extension = user.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`
}

function getActivity(data) {
  if (data?.listening_to_spotify && data.spotify) {
    return {
      label: 'Listening to Spotify',
      value: `${data.spotify.song} - ${data.spotify.artist}`,
    }
  }

  const activity = data?.activities?.find((item) => item.type !== 4)

  if (activity) {
    return {
      label: 'Activity',
      value: activity.details || activity.state || activity.name,
    }
  }

  const customStatus = data?.activities?.find((item) => item.type === 4)

  if (customStatus?.state) {
    return {
      label: 'Custom Status',
      value: customStatus.state,
    }
  }

  return {
    label: 'Activity',
    value: 'No current activity',
  }
}

function Sidebar({ profile }) {
  const [presence, setPresence] = useState(null)
  const [hasPresenceError, setHasPresenceError] = useState(false)
  const hasDiscordUserId = /^\d+$/.test(profile.discordUserId || '')

  useEffect(() => {
    if (!hasDiscordUserId) {
      return undefined
    }

    let isMounted = true

    async function loadPresence() {
      try {
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/${profile.discordUserId}`,
        )
        const result = await response.json()

        if (isMounted && result.success) {
          setPresence(result.data)
          setHasPresenceError(false)
        }
      } catch {
        if (isMounted) {
          setHasPresenceError(true)
        }
      }
    }

    loadPresence()
    const intervalId = window.setInterval(loadPresence, 30000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [hasDiscordUserId, profile.discordUserId])

  const discordUser = presence?.discord_user
  const discordStatus = presence?.discord_status || 'offline'
  const avatarUrl = getAvatarUrl(discordUser)
  const activity = useMemo(() => getActivity(presence), [presence])

  return (
    <aside className="profile-sidebar">
      <div className="city-banner" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="avatar-wrap">
        <div className="avatar-mark">
          {avatarUrl ? <img src={avatarUrl} alt="" /> : profile.initials}
        </div>
        <span
          className={`presence-dot is-${discordStatus}`}
          aria-label={`Discord status: ${STATUS_LABELS[discordStatus] || 'Offline'}`}
        />
      </div>

      <h1>{profile.name}</h1>
      <p className="handle">
        {profile.handle}
        {hasDiscordUserId && (
          <span className="status-label">
            {STATUS_LABELS[discordStatus] || 'Offline'}
          </span>
        )}
      </p>

      <div className="sidebar-divider" />

      <section className="sidebar-section">
        <h2>About Me</h2>
        <p>{profile.about}</p>
      </section>

      <section className="sidebar-section activity-section">
        <h2>Activity</h2>
        {!hasDiscordUserId && <p>Add your Discord user ID in profile.js.</p>}
        {hasDiscordUserId && hasPresenceError && <p>Discord status is unavailable.</p>}
        {hasDiscordUserId && !hasPresenceError && (
          <p>
            <strong>{activity.label}</strong>
            {activity.value}
          </p>
        )}
      </section>

      <section className="sidebar-section roles-section">
        <h2>Roles</h2>
        <div className="role-list">
          {profile.roles.map((role) => (
            <span className="role-pill" key={role}>
              {role}
            </span>
          ))}
        </div>
      </section>

      <section className="sidebar-section note-section">
        <h2>Note</h2>
        <p>{profile.note}</p>
      </section>

      <nav className="social-links" aria-label="Social links">
        {profile.socials.map((link) => (
          <a href={link.href} key={link.label} aria-label={link.label}>
            {SOCIAL_ICONS[link.label] || link.shortLabel}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

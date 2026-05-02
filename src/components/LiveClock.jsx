import { useEffect, useState } from 'react'

function LiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const time = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)

  const date = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(now)

  return (
    <time className="live-clock" dateTime={now.toISOString()} aria-label={`Current time ${time}`}>
      <span>{date}</span>
      <strong>{time}</strong>
    </time>
  )
}

export default LiveClock

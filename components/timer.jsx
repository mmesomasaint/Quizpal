import { useEffect, useState } from 'react'

export default function Timer({ number, timeout }) {
  const [seconds, setSeconds] = useState(number)

  useEffect(() => {
    const now = Date.now()
    const then = now + seconds + 1000

    const countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000)

      if (secondsLeft <= 0) {
        clearInterval(countdown)
        return
      }

      setSeconds(secondsLeft)
    })

    return () => {
      clearInterval(countdown)
    }
  }, [])

  useEffect(() => {
    if (seconds <= 100) timeout
  }, [seconds])

  return <DisplayTimeLeft seconds={seconds} />
}

function DisplayTimeLeft({ seconds }) {
  const h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor(((seconds % 86400) % 3600) / 60),
    s = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60

  return (
    <span>
      <span className='text-lg font-medium'>{h < 10 ? `0${h}` : h}</span>
      <span className='text-lg font-medium'>:</span>
      <span className='text-lg font-medium'>{m < 10 ? `0${m}` : m}</span>
      <span className='text-lg font-medium'>:</span>
      <span className='text-lg font-medium'>{s}</span>
    </span>
  )
}

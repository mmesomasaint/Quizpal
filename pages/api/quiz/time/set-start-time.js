import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../../lib/session'

async function setStartTime(req, res) {
  const { startTime } = req.body
  const { user } = req.session

  if (!user || !user.time) {
    res.status(401).json({ message: 'Something went wrong here' })
    return
  }

  // If startTime has already been sent don't reset
  if (user.time.startTime) {
    res.status(401).json({ message: `Quiz Started: ${user.time.startTime}` })
    return
  }

  const newUser = { ...user, time: { ...user.time, startTime } }
  req.session.user = newUser
  await req.session.save()
  res.status(200).json(newUser)
}

export default withIronSessionApiRoute(setStartTime, sessionOptions)

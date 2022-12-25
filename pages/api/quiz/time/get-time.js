import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../../lib/session'

async function getTime(req, res) {
  const { user } = req.session

  if (user.time) {
    res.json(user.time)
  } else {
    res.json({})
  }
  res.end()
}

export default withIronSessionApiRoute(getTime, sessionOptions)

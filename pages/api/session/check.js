import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'

async function userRoute(req, res) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      authenticated: true,
    })
  } else {
    res.json({
      authenticated: false,
    })
  }
  res.end()
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'

async function answers(req, res) {
  const { user } = req.session

  if (user.quizIds && user.course) {
    res.json(user.answers)
  } else {
    res.json([])
  }
  res.end()
}

export default withIronSessionApiRoute(answers, sessionOptions)

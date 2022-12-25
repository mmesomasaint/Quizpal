import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../lib/session'

async function quizIDs(req, res) {
  const { user } = req.session
  if (user.quizIds && user.course) {
    res.json({
      quiz: { quizIds: user.quizIds, course: user.course },
      hasQuiz: true,
      submitted: false
    })
  } else {
    res.json({ hasQuiz: false, submitted: false })
  }
  res.end()
}

export default withIronSessionApiRoute(quizIDs, sessionOptions)

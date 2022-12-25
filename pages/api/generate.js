import { generator } from '../../lib/quiz/generator'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../lib/session'

async function generate(req, res) {
  const { course, topicIds, quizTime } = req.body
  const { user } = req.session

  const quizIds = await generator(course, topicIds)
  if (!quizIds) {
    res.status(401).json({ message: 'Something went wrong!' })
  }

  // Add the generated quizIds into user session.
  req.session.user = {
    ...user,
    quizIds,
    course,
    answers: [],
    time: { quizTime },
  }
  res.writeHead(307, { location: '/start' })
  res.end()
}

export default withIronSessionApiRoute(generate, sessionOptions)

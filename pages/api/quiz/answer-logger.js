import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'

async function answerLogger(req, res) {
  const { user } = req.session
  const { curChoice } = req.body

  if (!user) {
    res.status(401).json({ message: 'You are not authenticated' })
    return
  }

  if (!user.quizIds && !user.course) {
    res.status(401).json({
      message: 'Create or join a quiz group, or prepare a personal quiz first',
    })
    return
  }

  if (user.answers) {
    const answers = user.answers
    const newAnswers = answers.filter(
      (answer) => answer.quizId !== curChoice.quizId
    )
    newAnswers.push(curChoice)

    req.session.user = { ...user, answers: newAnswers }
    await req.session.save()
    res.status(201).json({ message: 'Success' })
  } else {
    const answers = []
    answers.push(curChoice)

    req.session.user = { ...user, answers }
    await req.session.save()
    res.status(201).json({ message: 'Success' })
  }
}

export default withIronSessionApiRoute(answerLogger, sessionOptions)

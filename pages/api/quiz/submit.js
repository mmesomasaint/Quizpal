import { withIronSessionApiRoute } from 'iron-session/next'
import { getNAnswers, getTFAnswsers } from '../../../lib/quiz/quiz'
import Scorer from '../../../lib/quiz/scorer'
import sessionOptions from '../../../lib/session'

async function submit(req, res) {
  const { user } = req.session

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

  if (user.answers.length > 0) {
    const userAnswers = user.answers
    let realAnswers = [],
      score

    // Extract the first item in answer and get
    // the kind of answers to query for
    const firstItem = user.answers[0]
    if (firstItem.choice) {
      // Query for normal answers
      realAnswers = await getNAnswers(user.quizIds)
      score = Scorer(userAnswers, realAnswers)
    } else {
      //Query for t/f answers
      realAnswers = await getTFAnswsers(user.quizIds)
      score = Scorer(userAnswers, realAnswers, true)
    }

    // Clear all the questions and answers to prevent going back.
    delete user.quizIds
    delete user.answers
    delete user.time
    req.session.user = user
    await req.session.save()

    res.status(201).json({ message: 'success', score })
  } else {

    // Clear all the questions and answers to prevent going back.
    delete user.quizIds
    delete user.answers
    delete user.time
    req.session.user = user
    await req.session.save()

    res.status(201).json({ message: 'success', score: 0 })
  }
}

export default withIronSessionApiRoute(submit, sessionOptions)

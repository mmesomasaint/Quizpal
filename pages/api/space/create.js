import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'
import dbConnect from '../../../lib/dbConnect'
import Space from '../../../models/space'
import { generator } from '../../../lib/quiz/generator'
import { millimizeTime } from '../../../lib/quiz/time'

async function createRoute(req, res) {
  await dbConnect()
  const { course, topicIds, totalNum, quizTime } = await req.body

  try {
    // Generate a quiz for this space.
    const quizIds = await generator(course, topicIds, totalNum)

    // Organize quizTime
    const quiz_time = millimizeTime(quizTime)

    const { user } = await req.session
    const space = new Space({
      creator: user,
      buddies: [user],
      quizIds,
      course,
      active: false,
      quizTime: quiz_time,
    })
    await space.save()

    // Add the generated quizIds into user session.
    req.session.user = {
      ...user,
      quizIds,
      course,
      answers: [],
      time: { quizTime: quiz_time },
    }
    await req.session.save()
    res.status(201).json({ success: true, id: space.id })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export default withIronSessionApiRoute(createRoute, sessionOptions)

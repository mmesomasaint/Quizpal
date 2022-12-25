import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'
import dbConnect from '../../../lib/dbConnect'
import Space from '../../../models/space'

async function joinRoute(req, res) {
  const { id } = req.query
  const { user } = req.session

  if (!id) {
    res.status(401).json({ message: 'Invalid API' })
  }

  if (!user) {
    // if user hasn't redirect to auth.js.
    res.writeHead(307, { location: '/auth?type=JOIN&secret=${id}' })
  }

  if (user.quizIds && user.course) {
    res.writeHead(307, { location: '/waiting-room' })
  }

  await dbConnect()
  try {
    const oldSpace = await Space.findById(id)
    if (!oldSpace) throw new Error()

    const space = await Space.findByIdAndUpdate(
      id,
      { buddies: [...oldSpace.buddies, user] },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!space) throw new Error()

    // Add the users quizIds to his/her session.
    req.session.user = {
      ...user,
      quizIds: space.quizIds,
      course: space.course,
      answers: [],
      time: { quizTime: space.quizTime },
    }

    // redirect to waiting room.
    res.writeHead(307, { location: `/waiting-room?spaceId=${id}` })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

export default withIronSessionApiRoute(joinRoute, sessionOptions)

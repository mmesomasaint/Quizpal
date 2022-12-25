import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'
import dbConnect from '../../../lib/dbConnect'
import Space from '../../../models/space'

async function palRoute(req, res) {
  const { spaceId } = req.query
  const { user } = req.session
  await dbConnect()

  try {
    const space = await Space.findById(spaceId)
    if (!space) throw new Error()

    res.json({
      isOwner: space.creator.id === user.id,
      pals: space.buddies,
      active: space.active,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
  res.end()
}

export default withIronSessionApiRoute(palRoute, sessionOptions)

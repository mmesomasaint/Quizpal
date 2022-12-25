import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'

async function create(req, res) {
  const { id, username } = await req.body

  try {
    const user = { id: id, name: username }
    req.session.user = user
    await req.session.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withIronSessionApiRoute(create, sessionOptions)

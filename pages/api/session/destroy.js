import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '../../../lib/session'

async function destroy(req, res) {
  try {
    await req.session.destroy()
    res.status(200).json({ message: 'session ended' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withIronSessionApiRoute(destroy, sessionOptions)

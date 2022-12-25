export default async function handler(req, res) {
  const { secret } = req.query

  // If the invite link doesn't contain space id and secret
  // return 401 error message.
  if (!secret) {
    res.status(401).json({ message: 'Invalid API' })
    return
  }

  // redirect to authentication page to create session.
  res.writeHead(307, { location: `/auth?type=JOIN&secret=${secret}` })
  res.end()
}

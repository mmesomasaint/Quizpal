import Space from '../../../models/space'

export default async function handler(req, res) {
  const { id } = await req.body

  if (!id) {
    res.status(401).json({ message: 'Invalid API' })
    return
  }

  try {
    const space = await Space.findByIdAndUpdate(id, { active: true })
    res.status(201).json({ message: 'success', active: true })
  } catch (e) {
    res.status(401).json({ message: 'Something went wrong' })
  }

  res.end()
}

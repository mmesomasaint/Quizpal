import { getAllTopicsInCourse } from '../../lib/quiz/quiz'

export default async function handler(req, res) {
  const { course } = req.query
  if (!course) {
    res.status(401).json({ message: 'Invalid API' })
    return
  }

  const topics = await getAllTopicsInCourse(course)
  if (!topics) {
    res.status(401).json({ message: 'Something went wrong' })
    return
  }

  res.status(201).json(topics)
  res.end()
}

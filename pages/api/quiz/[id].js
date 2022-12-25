import { getQuizById } from '../../../lib/quiz/quiz'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    res.status(401).json({message: "Invalid API"})
    return
  }

  const quiz = await getQuizById(id)

  if (!quiz) {
    res.status(401).json({ message: 'Something went wrong' })
    return
  }

  res.status(201).json(quiz)
  res.end()
}

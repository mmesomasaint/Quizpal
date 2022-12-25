import { getTotalQuiz } from '../../lib/quiz/quiz'
import { getId } from '../../lib/quiz/generator'

export default async function handler(req, res) {
  const { course, topicIds } = req.query
  if (!course || !topicIds) {
    res.status(401).json({ message: 'Invalid API' })
    return
  }

  const totalQuiz = await getTotalQuiz(getId(course), JSON.parse(topicIds))
  if (totalQuiz < 0) {
    res.status(401).json({ message: 'Something went wrong' })
    return
  }
  res.status(201).json(totalQuiz)
  res.end()
}

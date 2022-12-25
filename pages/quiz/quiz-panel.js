import { useRouter } from 'next/router'
import { useMemo, useState, useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import Loading from '../../components/loading'
import Layout from '../../components/quiz/layout'
import Normal from '../../components/quiz/option/normal'
import TrueFalse from '../../components/quiz/option/true-false'
import useCountdown from '../../components/useCountdown'
import useQuiz from '../../lib/useQuiz'

export default function QuizPanel() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)

  // Make sure there is a quiz before loading anything.
  const { data, mutateAnswers } = useQuiz({ redirectTo: '/prepare-quiz' })
  const [quizIds, course, answers, time] = useMemo(() => {
    const quizInfo = data?.quiz
    return [
      quizInfo?.quizIds || [],
      quizInfo?.course || '',
      quizInfo?.answers || [],
      quizInfo?.time || {},
    ]
  }, [data])

  // Return index of id in answers array.
  const idx = (id) => quizIds.indexOf(id)

  const [id, setId] = useState(quizIds[0])

  const { data: quiz } = useSWR(`/api/quiz/${id || quizIds[0]}`, (url) =>
    fetch(url).then((r) => r.json())
  )

  const [cachedQuiz, setCachedQuiz] = useState(quiz)

  const prevChoice = useMemo(
    () => answers.find((answer) => answer.quizId === id)?.choice,
    [answers, id]
  )

  const [isTrueFalse, setIsTrueFalse] = useState(quiz?.tF || false)

  const submit = () => {
    setLoading(true)
    fetch('/api/quiz/submit').then(async (r) => {
      if (r.ok) {
        setLoading(false)
        const data = await r.json()
        mutate('/api/quiz-ids') // Update the quiz-ids
        router.push(`/quiz/submit?score=${data.score}`)
      }
    })
  }

  const { Timer } = useCountdown(time, submit)

  useEffect(() => {
    // Send the start time for the very first render.
    fetch('/api/quiz/time/set-start-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startTime: new Date(),
      }),
    })
  }, [])

  useEffect(() => {
    if (answers.length > 0) setId(answers[answers.length - 1].quizId)
    else setId(quizIds[0])
  }, [answers, quizIds])

  useEffect(() => {
    if (quiz) {
      setCachedQuiz(quiz)
      setIsTrueFalse(quiz.tF)
    }
  }, [quiz])

  return (
    <Layout>
      {loading && <Loading />}
      <div className='mx-4'>
        <div className='p-4 backdrop-blur fixed flex justify-between items-center top-0 right-0 left-0'>
          <div className='text-xl font-bold leading-none text-teal-600'>
            {course}
          </div>
          <div className='flex justify-between items-center gap-3'>
            <Timer />
            <button
              onClick={submit}
              className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-teal-600 text-gray-50'
            >
              Submit
            </button>
          </div>
        </div>
        <div className='pt-24 px-4'>
          {cachedQuiz ? (
            <div className=''>
              {!quiz && <Loading />}
              <div className=''>
                <span className='text-2xl font-medium text-gray-50 leading-tight'>
                  {idx(cachedQuiz?.id) + 1}.{' '}
                </span>
                <span className='text-2xl font-medium text-gray-50 leading-tight'>
                  {cachedQuiz?.question}
                </span>
              </div>
              <div className='my-8'>
                {isTrueFalse ? (
                  <TrueFalse.Options
                    options={cachedQuiz?.options}
                    quizId={cachedQuiz?.id}
                    initChoice={prevChoice}
                    updateAnswers={mutateAnswers}
                  />
                ) : (
                  <Normal.Options
                    options={cachedQuiz?.options}
                    quizId={cachedQuiz?.id}
                    initChoice={prevChoice}
                    updateAnswers={mutateAnswers}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center min-h-[23rem'>
              <span className='text-lg font-bold text-[#800000] leading-none'>
                initializing...
              </span>
            </div>
          )}
        </div>
        <div className='flex gap-6 w-full justify-start items-center my-8'>
          <button
            onClick={() => setId((prev) => quizIds[idx(prev) - 1])}
            className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-[#800000] text-gray-50 disabled:bg-opacity-50'
            disabled={idx(id) === 0}
          >
            Prev
          </button>
          <button
            onClick={() => setId((prev) => quizIds[idx(prev) + 1])}
            className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-[#800000] text-gray-50 disabled:bg-opacity-50'
            disabled={idx(id) === quizIds.length - 1}
          >
            Next
          </button>
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-start mt-10'>
          {quizIds?.map((qId, idx) => {
            const isActive = id === qId
            const answeredIds = answers.map((answer) => answer.quizId)
            const beenAnswered = answeredIds.includes(qId)
            let color = ''

            if (isActive) color = 'bg-[#800000] text-gray-50'
            else {
              if (beenAnswered) color = 'bg-teal-600 text-white'
              else color = 'bg-gray-300 text-gray-900'
            }

            return (
              <button
                key={qId}
                onClick={() => setId(qId)}
                className={`border-0 ${color} block rounded-md shadow-sm px-5 py-1 text-lg font-medium`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

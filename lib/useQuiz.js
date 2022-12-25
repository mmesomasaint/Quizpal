import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import useUser from './useUser'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function useQuiz({ redirectTo = '' } = {}) {
  const { _ } = useUser({ redirectTo: '/auth' }) // Ensure user is authed first.
  const { data } = useSWR('/api/quiz-ids', fetcher)
  const { data: answers, mutate } = useSWR('/api/quiz/answers', fetcher)
  const { data: time } = useSWR('/api/quiz/time/get-time', fetcher)

  const mutateAnswers = (newChoice) => {
    const new_ = answers.filter((val) => val.id !== newChoice.id)
    new_.push(newChoice)

    mutate(new_)
  }

  useEffect(() => { 
    console.log('data1: ', data)
    // If redirectTo is set, redirect if the quizIds was not found.
    if (data && !data.hasQuiz) {
      console.log('data2: ', data)
      Router.push(redirectTo)
      return
    }
  }, [data])

  return {
    data: { ...data, quiz: { ...data?.quiz, answers, time } },
    mutateAnswers,
  }
}

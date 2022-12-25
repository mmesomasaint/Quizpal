import { useEffect, useState } from 'react'
import Loading from '../loading'

export default function Options({
  quizId,
  options = [],
  initChoice = '',
  updateAnswers,
}) {
  const [choice, setChoice] = useState()
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setChoice(e.target.value)
  }

  // If a different option is chosen
  // and its a value send to answers
  // stack for sessionization""".
  useEffect(() => {
    if (choice) {
      setLoading(true)
      fetch('/api/quiz/answer-logger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          choice,
        }),
      }).then((r) => {
        if (r.ok) {
          // Trigger a revalidation of answers
          updateAnswers(quizId, choice)
          setLoading(false)
        }
      })
    }
  }, [choice])

  return (
    <div className=''>
      {loading && <Loading />}
      <ol className='list-[upper-alpha] text-xl px-8'>
        {options.map(({ option }) => (
          <li key={option} className='list-item my-6'>
            <Option
              option={option}
              checked={option === choice || option === initChoice}
              onChange={handleChange}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

function Option({ option, checked, onChange }) {
  return (
    <div className='flex gap-4'>
      <input
        type='radio'
        id={option}
        name='option'
        value={option}
        onChange={onChange}
        checked={checked}
        className='w-[2rem] border-0 h-[1.0rem]'
      />
      <label
        htmlFor={option}
        className='text-xl font-medium text-gray-200 leading-none'
      >
        {option}
      </label>
    </div>
  )
}

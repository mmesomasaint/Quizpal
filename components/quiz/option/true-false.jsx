import { useEffect, useState } from 'react'
import Loading from '../../loading'

function Options({ quizId, options = [], initChoices = [], updateAnswers }) {
  const [choices, setChoices] = useState([])
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    console.log("I was triggered")
    setChoices((prev) => {
      let _new = prev.filter((val) => val.title !== e.target.name)
      _new.push({
        title: e.target.name,
        active: e.target.value === 'true' ? true : false,
      })

      return _new
    })
  }
  const findChoice = (opt) => initChoices.find((choice) => choice.title === opt)
  const isFalse = (opt) => {
    if (findChoice(opt)) return !findChoice(opt).active
    else return false
  }

  // If a different option is chosen
  // and its a value send to answers
  // stack for sessionization""".
  useEffect(() => {
    if (choices.length > 0) {
      setLoading(true)

      const curChoice = { quizId, choices }
      fetch('/api/quiz/answer-logger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ curChoice }),
      }).then((r) => {
        if (r.ok) {
          // Trigger a revalidation of answers
          updateAnswers(curChoice)
          setLoading(false)
        }
      })
    }
  }, [choices])

  return (
    <div className=''>
      {loading && <Loading />}
      <ol className='list-[upper-alpha] text-xl px-2'>
        {options.map(({ option }) => (
          <li key={option} className='list-item my-6 w-full'>
            <div className='flex'>
              <div className='grid grid-cols-9 gap-2 place-content-center'>
                <div className='col-span-6 px-1 leading-none'>{option}</div>
                <SubOptions
                  option={option}
                  checked={{
                    isTrue: findChoice(option)?.active,
                    isFalse: (() => {
                      isFalse()
                    })(),
                  }}
                  onChange={handleChange}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SubOptions({ option, checked, onChange }) {
  return (
    <div className='col-span-1 flex gap-1'>
      <div className='flex'>
        <input
          type='radio'
          id='true'
          name={option}
          value={true}
          onChange={onChange}
          checked={checked.isTrue}
          className='w-[2rem] border-0 h-[1.0rem]'
        />
        <label
          htmlFor='true'
          className='text-xl font-medium text-gray-200 leading-none'
        >
          T
        </label>
      </div>
      <div className='flex'>
        <input
          type='radio'
          id='false'
          name={option}
          value={false}
          onChange={onChange}
          checked={checked.isFalse}
          className='w-[2rem] border-0 h-[1.0rem]'
        />
        <label
          htmlFor='false'
          className='text-xl font-medium text-gray-200 leading-none'
        >
          F
        </label>
      </div>
    </div>
  )
}

const TrueFalse = { Options }
export default TrueFalse

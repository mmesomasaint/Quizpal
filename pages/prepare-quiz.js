import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import Authenticated from '../components/authenticated'
import FormLayout from '../components/form-layout'
import LinkModal from '../components/link-modal'
import { useMultiBtnInput } from '../components/useMultiBtnInput'
import useRadioGroup from '../components/useRadioGroup'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function PrepareQuiz() {
  const router = useRouter()
  const solo = router.query.solo
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState('')
  const [data, setData] = useState({
    course_name: 'Pharmacology',
    quiz_time: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
  })

  const { data: topics } = useSWR(
    `/api/course-topics?course=${data.course_name}`,
    fetcher
  )
  const [multiInputData, MultiInputDisplay] = useMultiBtnInput(topics)

  const { data: totalQuiz } = useSWR(
    `/api/total-quiz?course=${data.course_name}&topicIds=${JSON.stringify(
      multiInputData
    )}`,
    fetcher
  )
  const [question_no, RadioGroupDisplay] = useRadioGroup(totalQuiz)

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onTimeChange = (e) => {
    const quiz_time = { ...data.quiz_time, [e.target.name]: e.target.value }
    setData((prev) => ({ ...prev, quiz_time }))
  }

  const submit = (e) => {
    e.preventDefault()

    if (solo) {
      fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: data.course_name,
          topicIds: multiInputData,
          totalNum: question_no,
          quizTime: data.quiz_time,
        }),
      }).then((r) => {
        if (r.ok) router.push('/quiz/quiz-panel')
      })
    } else {
      fetch('/api/space/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: data.course_name,
          topicIds: multiInputData,
          totalNum: question_no,
          quizTime: data.quiz_time,
        }),
      }).then(async (r) => {
        if (r.ok) {
          const link = await r.json()
          setShowModal(true)
          setLink(link.id)
        }
      })
    }
  }

  return (
    <Authenticated>
      <FormLayout>
        <div>
          <LinkModal show={showModal} link={link} />
          <div>
            <div className='text-4xl font-semibold leading-tight text-center w-full text-gray-300'>
              Prepare Quiz
            </div>
            <div className='text-center text-lg font-medium leading-tight w-full text-gray-400 mt-2'>
              Adjust the quiz to your preferred form.
            </div>
          </div>
          <form className='p-2 mt-3' onSubmit={submit}>
            <div className='mt-4'>
              <label className='block mb-1 text-gray-300' htmlFor='course'>
                Course
              </label>
              <select
                name='course_name'
                value={data.course_name}
                className='w-full p-2 text-xl font-normal text-gray-900 rounded-md focus:outline-none focus:border-2 focus:border-gray-500'
                onChange={handleChange}
              >
                <option value='Pharmacology'>Pharmacology</option>
                <option value='Computer Sci.'>Computer Sci.</option>
                <option value='Pharmacognosy'>Pharmacognosy</option>
                <option value='Pharm. Chemistry'>Pharm. Chemistry</option>
                <option value='Pharm. Management'>Pharm. Management</option>
                <option value='Biopharmaceutics'>Biopharmaceutics</option>
              </select>
            </div>
            <div className='mt-4'>
              <label className='block mb-1 text-gray-300' htmlFor='topics'>
                Topics
              </label>
              {topics ? <MultiInputDisplay /> : <div>Loading...</div>}
            </div>
            <div className='mt-4'>
              <label className='block mb-1 text-gray-300'>
                Number of Questions
              </label>
              {totalQuiz ? <RadioGroupDisplay /> : <div>Loading...</div>}
            </div>
            <div className='mt-4'>
              <label className='block mb-1 text-gray-300'>Set Timer</label>
              <div className='w-full flex gap-3'>
                <div className='flex w-full gap-2 items-end'>
                  <input
                    id='hh'
                    type='number'
                    name='hh'
                    value={data.quiz_time.hh}
                    className='w-[70%] text-xl font-medium text-center flex-grow-1 shadow-sm rounded-sm focus:outline-none p-1'
                    onChange={onTimeChange}
                  />
                  <label htmlFor='hh' className='text-gray-300'>
                    hh
                  </label>
                </div>
                <span className='text-gray-50 text-xl font-medium '>:</span>
                <div className='flex w-full gap-2 items-end'>
                  <input
                    id='mm'
                    type='number'
                    name='mm'
                    value={data.quiz_time.mm}
                    className='w-[70%] text-xl font-medium text-center flex-grow-1 shadow-sm rounded-sm focus:outline-none p-1'
                    onChange={onTimeChange}
                  />
                  <label htmlFor='mm' className='text-gray-300'>
                    mm
                  </label>
                </div>
                <span className='text-gray-50 text-xl font-medium '>:</span>
                <div className='flex w-full gap-2 items-end'>
                  <input
                    id='ss'
                    type='number'
                    name='ss'
                    value={data.quiz_time.ss}
                    className='w-[70%] text-xl font-medium text-center flex-grow-1 shadow-sm rounded-sm focus:outline-none p-1'
                    onChange={onTimeChange}
                  />
                  <label htmlFor='ss' className='text-gray-300'>
                    ss
                  </label>
                </div>
              </div>
            </div>
            <div className='mt-4 w-full flex justify-end'>
              <button
                type='submit'
                className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-green-700 text-white'
              >
                {solo ? 'Start Quiz' : 'Prepare Quiz'}
              </button>
            </div>
          </form>
        </div>
      </FormLayout>
    </Authenticated>
  )
}

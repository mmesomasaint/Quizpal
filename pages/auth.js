import { useState } from 'react'
import { useRouter } from 'next/router'
import FormLayout from '../components/form-layout'

export default function Auth() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [processing, setProcessing] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setProcessing(true)

    fetch('/api/session/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 5001,
        username,
      }),
    })
      .then(async (res) => {
        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await res.json() : null

        // check for error response
        if (!res.ok) {
          // get error message from body or default to response status
          const error = (Object.keys(data).length > 0 && data) || res.status
          return Promise.reject(error)
        }

        setProcessing(false)
        const { type, secret } = router.query
        if (type && type === 'JOIN') {
          if (secret) router.push(`/api/join?id=${secret}`)
          else router.push('/')
        } else router.push('/quiztype')
      })
      .catch((error) => {
        setProcessing(false)
        console.log(error)
      })
  }
  return (
    <FormLayout>
      <div>
        <div className='text-4xl font-semibold leading-tight text-center w-full text-gray-300'>
          Choose a name
        </div>
        <div className='text-lg font-medium leading-tight w-full text-gray-400 mt-2'>
          You will be identified with this name.
        </div>
      </div>
      <form className='p-2 mt-5' onSubmit={submit}>
        <div>
          <input
            type='text'
            placeholder='Enter your name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 text-base font-normal text-gray-900 rounded-md focus:outline-none focus:border-2 focus:border-gray-500'
          />
          <div className='mt-3 flex justify-center w-full'>
            <button
              className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-green-700 text-white'
              type='submit'
              disabled={processing}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </FormLayout>
  )
}

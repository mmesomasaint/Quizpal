import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function WaitingRoom() {
  const router = useRouter()
  const { spaceId } = router.query
  const { data: room } = useSWR(`/api/space/pals?spaceId=${spaceId}`, fetcher)

  const submit = (e) => {
    e.preventDefault()

    if (room?.isOwner) {
      fetch(`/api/space/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: spaceId,
        }),
      }).then(async (r) => {
        if (r.ok) router.push('/quiz/quiz-panel')
      })
    } else router.push('/quiz/quiz-panel')
  }

  return (
    <div className='px-6'>
      <div className='min-h-screen w-full'>
        <div>
          <div className='text-4xl font-semibold leading-tight text-center w-full text-gray-300'>
            Waiting Room
          </div>
          <div className='text-lg font-medium leading-tight w-full text-gray-400 mt-2 text-center'>
            ID: {spaceId}
          </div>
        </div>
        <div className='mt-5 mb-3'>
          {room ? (
            room.pals && (
              <div className=''>
                {room.pals?.map((pal) => (
                  <div
                    key={pal.name}
                    className='p-4 rounded-md shadow-sm border-2 border-gray-700 text-xl font-semibold leading-none text-gray-900'
                  >
                    {pal.name}
                    {room?.isOwner && (
                      <span className='text-base font-medium leading-none text-gray-600'>
                        {' '}
                        - creator
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className='mt-4 w-full flex-col items-center justify-center'>
          <form onSubmit={submit}>
            <button
              type='submit'
              className='w-fit mx-auto block rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-green-700 text-white disabled:opacity-40'
              disabled={!room?.isOwner && !room?.active}
            >
              Start Quiz
            </button>
          </form>
          <span className='block text-lg font-medium leading-tight w-full text-gray-400 mt-2 text-center'>
            {room?.isOwner
              ? 'You created this room, so you determine when the quiz starts'
              : 'Waiting for room creator to start quiz'}
          </span>
        </div>
      </div>
    </div>
  )
}

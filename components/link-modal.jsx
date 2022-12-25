import { useRouter } from 'next/router'

export default function LinkModal({ show, link }) {
  const router = useRouter()

  if (show)
    return (
      <div className='absolute inset-0 z-10 backdrop-blur-md flex items-center justify-center p-4'>
        <div className='w-full'>
          <div className='rounded-md shadow-sm p-6 bg-stone-800 w-full'>
            <div className=''>
              <div>
                <div className='text-4xl font-semibold leading-tight text-center w-full text-gray-300'>
                  Your Quiz Link
                </div>
                <div className='text-lg font-medium leading-tight w-full text-gray-400 mt-2'>
                  Share the link below, to friends to invite them and answer
                  your quiz together.
                </div>
              </div>
              <input
                type='text'
                value={`http:localhost:3000/api/invite?secret=${link}`}
                className='w-full p-2 text-lg font-medium mt-6 mb-4 rounded-md focus:outline-gray-400'
                readOnly
              />
            </div>
            <div className='w-full flex justify-center'>
              <button
                onClick={() => {
                  router.push(`/waiting-room?spaceId=${link}`)
                }}
                className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-green-700 text-white'
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

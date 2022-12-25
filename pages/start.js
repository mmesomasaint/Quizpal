import Authenticated from '../components/authenticated'

export default function Start() {
  return (
    <Authenticated>
      <div className='min-h-screen flex justify-center items-center bg-white'>
        <div className='p-3'>
          <button className='px-4 py-1 leading-none text-sm text-white font-medium rounded-sm shadow-sm'>
            Start
          </button>
        </div>
      </div>
    </Authenticated>
  )
}

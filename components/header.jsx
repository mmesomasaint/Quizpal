import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  return (
    <div className='w-full fixed backdrop-blur-sm p-4 z-40 flex justify-between items-center'>
      <div className='w-fit '>
        <div className='text-3xl font-bold leading-none'>
          <span className='text-green-700 capitalize'>Quiz</span>
          <span className='text-white lowercase'>pal</span>
        </div>
      </div>
      <div className='w-fit'>
        <button
          className='text-base font-semibold px-5 py-2 leading-none text-black border-2 border-green-700 rounded-md'
          onClick={() => router.push('/auth')}
        >
          Start
        </button>
      </div>
    </div>
  )
}

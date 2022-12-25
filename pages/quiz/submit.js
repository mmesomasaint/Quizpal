import { useRouter } from 'next/router'
import Footer from '../../components/footer'

export default function Submit() {
  const router = useRouter()
  return (
    <div className='relative flex flex-col min-h-screen justify-start w-full bg-stone-800 text-white'>
      <div className='flex-grow flex flex-col justify-center items-center'>
        <span className='text-white text-2xl font-medium leading-tight'>
          Your Score is:
        </span>
        <div className='flex gap-2 items-end mt-5'>
          <div className='w-full text-center rounded-full w-24 h-24 bg-gradient-to-br from-green-600 to-teal-700'>
            <span className='text-7xl font-extrabold leading-tight text-black'>
              {router.query.score}
            </span>
          </div>
          <span className='text-2xl font-medium text-white mb-2'>/</span>
          <span className='text-2xl font-medium text-white mb-2'>10</span>
        </div>
        <div className='w-full flex justify-center items-center mt-14'>
          <button className='rounded-md shadow-sm px-5 py-1 text-lg font-medium bg-green-700 text-white'>
            Go again
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

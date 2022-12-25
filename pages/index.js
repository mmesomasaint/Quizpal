import { useRouter } from 'next/router'
import Footer from '../components/footer'
import Header from '../components/header'

export default function Home() {
  const router = useRouter()

  return (
    <div className='bg-stone-800'>
      <Header />
      <div className='w-full h-[30rem] flex justify-center items-center bg-sky-600'>
        <div className='w-[85%] p-2 text-gray-200'>
          <div className='text-6xl font-bold leading-none text-center'>
            Quizpal
          </div>
          <div className='text-xl font-semibold leading-tight text-center mt-3'>
            The proper, faster and most effective way to study is in a group,
            answering questions.
          </div>
        </div>
      </div>
      <div className='w-full h-fit flex flex-col justify-center items-center relative -top-10 backdrop-blur-md pt-10'>
        <div className='px-3'>
          <div className='mx-4 mt-4 text-4xl font-semibold leading-none text-center text-gray-200'>
            Get Familiar with Computer Based Test (CBT)
          </div>
          <div className='text-xl font-medium my-5 text-gray-400 px-5'>
            Its very comforting to practice before an exam or test. With Quizpal
            the anxiety or tension won't be there.
          </div>
          <div className='w-full'>
            <button
              className='w-[40%] mx-auto block px-5 py-2 leading-none text-lg font-semibold border border-green-500 rounded-md text-gray-200'
              onClick={() => router.push('/auth')}
            >
              Practice more
            </button>
          </div>
        </div>
        <div className='mt-10'>
          <div className='mx-4 text-4xl font-semibold leading-none text-center text-gray-200'>
            Link up with pals and buddies
          </div>
          <div className='text-xl font-medium my-5 text-gray-400 px-5'>
            Answering questions with pals and buddies can be enough to boost
            your confidence or see where you are lacking and need improvments.
          </div>
          <div className='w-full'>
            <button
              className='w-[40%] mx-auto block px-5 py-2 leading-none text-lg font-semibold border border-green-500 rounded-md text-gray-200'
              onClick={() => router.push('/auth')}
            >
              Start Group Quiz
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

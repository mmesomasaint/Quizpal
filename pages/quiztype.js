import Authenticated from '../components/authenticated'
import FormLayout from '../components/form-layout'

export default function QuizType() {
  return (
    <Authenticated>
      <FormLayout>
        <div>
          <div className='text-4xl font-semibold leading-tight text-center w-full text-gray-300'>
            Choose Quiz Type
          </div>
          <div className='text-lg font-medium leading-tight w-full text-gray-400 mt-2'>
            Select buddy group if you will be writing this quiz with your pals,
            otherwise select for just you.
          </div>
        </div>
        <div className='w-full flex justify-center gap-6 h-fit mt-8'>
          <a
            href='/prepare-quiz'
            className='block rounded-md px-5 py-2 text-lg font-medium bg-green-700 text-white'
          >
            Buddy Group
          </a>
          <a
            href='/prepare-quiz?solo=1'
            className='block rounded-md px-5 py-2 text-lg font-medium bg-green-700 text-white'
          >
            Just You
          </a>
        </div>
      </FormLayout>
    </Authenticated>
  )
}

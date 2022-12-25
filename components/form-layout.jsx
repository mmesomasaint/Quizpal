import Footer from './footer'

export default function FormLayout({ children }) {
  return (
    <div className='relative flex flex-col min-h-screen justify-start w-full'>
      <div className='flex-grow h-full w-full flex justify-center items-center'>
        <div className='rounded-md shadow-sm p-6 bg-stone-800 m-2'>
          {children}
        </div>
      </div>
      <div className='bg-black w-full p-4'>
        <Footer />
      </div>
    </div>
  )
}

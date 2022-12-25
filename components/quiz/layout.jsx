import Footer from '../footer'

export default function Layout({ children }) {
  return (
    <div className='relative flex flex-col gap-10 min-h-screen justify-start w-full bg-stone-800 text-white'>
      <div className='flex-grow'>{children}</div>
      <Footer /> 
    </div>
  )
}

export default function Loading() {
  return (
    <div className='absolute inset-0 z-20 bg-[rgba(0,0,0,0.24)] flex justify-center items-center'>
      <span className='font-bold text-lg text-gray-100 leading-none'>
        Loading...
      </span>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className='absolute inset-0 z-20 bg-[rgba(0,0,0,0.24)] flex justify-center items-center'>
      <span className='font-bold text-lg text-gray-100 leading-none'>
        Loading Page...
      </span>
    </div>
  )
}

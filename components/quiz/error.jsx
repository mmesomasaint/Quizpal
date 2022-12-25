export default function Error({error, onRetry}) {
  return (
    <div className="backdrop-blur bg-red-400 text-gray-900 p-6 text-sm font-medium">{error}</div>
  )
}
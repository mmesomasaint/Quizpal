import useUser from "../lib/useUser";

export default function Authenticated({children}) {
  const {_} = useUser({redirectTo: '/auth'})

  return (
    <div>
      {children}
    </div>
  )
}
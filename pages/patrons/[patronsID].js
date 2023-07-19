import { useRouter } from 'next/router'

function PatronPage() {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      <h1>Patron Page</h1>
    </div>
  )
}

export default PatronPage

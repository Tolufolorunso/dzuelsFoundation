import { getSession } from 'next-auth/react'

function EditItemPage() {
  return (
    <div>
      <h1>Dzuels Foundation</h1>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}

export default EditItemPage

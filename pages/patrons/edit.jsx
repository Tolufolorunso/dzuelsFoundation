import CatalogingForm from '@/components/cataloging/cataloging-form'
import Container from '@/components/layout/container'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

function EditPatronPage() {
  return (
    <Container>
      <h1>patron edit</h1>
    </Container>
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

  return {
    props: {
      user: {
        username: session.user.username,
        role: session.user.role,
        name: session.user.name,
      },
    },
  }
}

export default EditPatronPage

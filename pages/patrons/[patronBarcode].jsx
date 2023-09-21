import fetchApi from '@/utils/fetchApi';
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function PatronPage() {
  const router = useRouter()
  const [patronData, setPatronData] = useState(null);

  useEffect(() => {
    async function fetchPatronData() {
      try {
        const res = await fetchApi(`/patrons/${router.query.patronBarcode}`);
        const { status, message, patron } = res

        if (status) {
          setPatronData(patron);
          console.log(patron)
          toast.success(message)
        } else {
          // Handle error, e.g., patron not found
          throw new Error('Error fetching patron data:', message);
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchPatronData();
  }, [router.query.patronsID]);

  return (
    <div>
      <h1>Patron Page</h1>
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

export default PatronPage

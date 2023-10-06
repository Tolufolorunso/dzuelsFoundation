import Container from '@/components/layout/container'
import EditForm from '@/components/patron/Edit/EditForm'
import usePatronStore from '@/store/patronStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function EditPatronPage() {
  const patronData = usePatronStore((state) => state.patrons.patronData)
  const { query, push } = useRouter()

  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    middlename: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    street: '',
    city: 'ijero',
    state: 'ekiti',
    country: 'nigeria',
    barcode: '',
    library: 'AAoJ',
    employerName: '',
    schoolName: '',
    schoolAdress: '',
    schoolEmail: '',
    schoolPhoneNumber: '',
    headOfSchool: '',
    currentClass: '',
    parentName: '',
    parentAddress: '',
    parentPhoneNumber: '',
    relationshipToPatron: '',
    parentEmail: '',
    messagePreferences: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      const res = await fetchApi(
        '/patrons/' + formData.barcode,
        'PUT',
        formData
      )
      const { status, message, patron } = res

      if (status) {
        toast.success(message)
        setTimeout(() => push('/patrons/' + patron.barcode), 1500)
      } else {
        throw new Error(
          'Something bad went wrong. Please contact your administrator'
        )
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCancelClick() {
    push('/patrons/' + query.patronBarcode)
  }

  return (
    <Container>
      <EditForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        patronBarcode={query.patronBarcode}
        patronData={patronData}
        setFormData={setFormData}
        isLoading={isLoading}
        handleCancelClick={handleCancelClick}
      />
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

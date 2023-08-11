import Container from '@/components/layout/container'
import AddPatron from '@/components/patron/AddPatron'
import useAppStore from '@/store/applicationStateStore'
import usePatronStore from '@/store/patronStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

function CreatePatronPage() {
  const setErrorMessage = useAppStore((state) => state.setErrorMessage)
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage)
  const patronType = usePatronStore((state) => state.patrons.selectedPatronType)
  const setIsLoading = usePatronStore((state) => state.setIsLoading)

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
    messagePreferences: 'email,sms,call',
  })

  const clearFormDataExceptLibrary = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      surname: '',
      firstname: '',
      middlename: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      street: '',
      barcode: '',
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
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let patronData = { ...formData, patronType: patronType }

    if (patronType === 'guest') {
      patronData = {
        surname: patronData.surname,
        firstname: patronData.firstname,
        middlename: patronData.middlename,
        email: patronData.email,
        phoneNumber: patronData.phoneNumber,
        gender: patronData.gender,
        dateOfBirth: patronData.dateOfBirth,
        street: patronData.street,
        city: patronData.city,
        state: patronData.state,
        country: patronData.country,
        barcode: patronData.barcode,
        library: 'AAoj',
        patronType: patronType,
      }
    }

    try {
      setIsLoading(true)
      const res = await fetchApi('/patrons', 'POST', patronData)
      const { status, message, patron } = res

      if (status) {
        clearFormDataExceptLibrary()
        setSuccessMessage(
          `${message}. Welcome ${patron.firstname}: ${patron.barcode}`
        )
      } else {
        throw new Error(
          'Something bad went wrong. Please contact your administrator'
        )
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <AddPatron
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
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

export default CreatePatronPage

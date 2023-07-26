import Container from '@/components/layout/container'
import AddPatron from '@/components/patron/add-patron'
import useAppStore from '@/store/applicationStateStore'
import usePatronStore from '@/store/patronStore'
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
    city: '',
    state: '',
    country: '',
    barcode: '',
    library: 'AAoj',
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
      city: '',
      state: '',
      country: '',
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
      messagePreferences: '',
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
      const response = await fetch('/api/patrons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patronData),
      })

      const data = await response.json()

      if (response.ok) {
        // console.log(66, data)
        // clearFormDataExceptLibrary()
        setSuccessMessage(
          `Patron Added Successfully. Welcome ${data.patron.firstname}: ${data.patron.barcode}`
        )
      } else {
        setErrorMessage(data.error)
      }
    } catch (error) {
      // console.error('Error adding book:', error)
      setErrorMessage('Error adding book:', error.message)
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

export default CreatePatronPage

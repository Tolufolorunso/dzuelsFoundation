import Container from '@/components/layout/container'
import AddPatron from '@/components/patron/add-patron'
import { useState } from 'react'

function CreatePatronPage() {
  const [patronType, setPatronType] = useState('student')

  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    patronType: patronType,
  })

  const changePatronTypeHandler = (event) => {
    setPatronType(event.target.value)
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
    try {
      // Send the form data to the Next.js backend (API route)
      const response = await fetch('/api/patrons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Book added successfully, do something (e.g., show a success message)
      } else {
        // Handle the error (e.g., show an error message)
        const data = await response.json()
        // console.error(data.error)
      }
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  return (
    <Container>
      <AddPatron
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        patronType={patronType}
        changePatronTypeHandler={changePatronTypeHandler}
      />
    </Container>
  )
}

export default CreatePatronPage

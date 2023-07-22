import React, { useState } from 'react'

import { useRouter } from 'next/router'

import CatalogingForm from '@/components/cataloging/cataloging-form'
import Container from '@/components/layout/container'
import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'

function AddItemPage() {
  const [formData, setFormData] = useState({
    title: 'The spirit of Herod',
    subtitle: '',
    mainAuthor: 'Joshua sunday awe',
    additionalAuthor: '',
    publisher: 'Destiny Publication',
    place: 'Ibadan',
    year: '2012',
    ISBN: '9783620940',
    barcode: '800123',
    subjectHeadings: 'Lit',
    classification: '800',
    controlNumber: '20',
    indexTermGenre: 'fiction',
    informationSummary: 'This is a good book',
    language: 'english',
    physicalDescription: '',
    holdingsInformation: 40,
  })

  const router = useRouter()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function goToCatalogPageHandler() {
    router.replace('/catalogs')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Send the form data to the Next.js backend (API route)
      const response = await fetch('/api/cataloging', {
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
        console.error(data.error)
      }
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  return (
    <Container>
      <CatalogFunctionBtns />

      <CatalogingForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        goToCatalogPageHandler={goToCatalogPageHandler}
      />
    </Container>
  )
}

export default AddItemPage

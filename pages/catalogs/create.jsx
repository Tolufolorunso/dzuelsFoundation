import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar'

import CatalogingForm from '@/components/cataloging/cataloging-form'
import Container from '@/components/layout/container'
import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'

import MuiAlert from '@mui/material/Alert'
import { getSession } from 'next-auth/react'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function AddItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    mainAuthor: '',
    additionalAuthors: '',
    publisher: '',
    place: '',
    year: '',
    ISBN: '',
    barcode: '',
    classification: '',
    controlNumber: '',
    indexTermGenre: '',
    informationSummary: '',
    language: 'english',
    physicalDescription: '',
    holdingsInformation: 1,
    library: 'AAoJ',
  })

  const [loading, setLoading] = useState(false)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  })
  const { vertical, horizontal, open, message } = state

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

  const clearFormDataExceptLibrary = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: '',
      subtitle: '',
      mainAuthor: '',
      additionalAuthors: '',
      publisher: '',
      place: '',
      year: '',
      ISBN: '',
      barcode: '',
      indexTermGenre: '',
      informationSummary: '',
      physicalDescription: '',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      // Send the form data to the Next.js backend (API route)
      const response = await fetch('/api/cataloging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        // Book added successfully, do something (e.g., show a success message)
        clearFormDataExceptLibrary()
        setState({
          ...state,
          open: true,
          message: `${data.message}. Barcode: ${data.data.barcode}`,
        })
      } else {
        // Handle the error (e.g., show an error message)
        setState({ ...state, open: true, message: data.error })
      }
    } catch (error) {
      setState({ ...state, open: true })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setState({ ...state, open: false, message: '' })
  }

  return (
    <Container>
      <CatalogFunctionBtns />

      <CatalogingForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        goToCatalogPageHandler={goToCatalogPageHandler}
        loading={loading}
      />
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      /> */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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

export default AddItemPage

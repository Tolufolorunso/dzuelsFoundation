import CatalogingForm from '@/components/cataloging/CatalogingForm'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'

function EditItemPage() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  const router = useRouter()
  const item = router.query

  if (!item.barcode) {
    router.replace('/catalogs')
  }

  const [formData, setFormData] = useState({
    title: item.mainTitle,
    subtitle: item.subtitle,
    mainAuthor: item.mainAuthor,
    additionalAuthors: item.additionalAuthors,
    publisher: item.publisher,
    place: item.place,
    year: item.year,
    ISBN: item.ISBN,
    barcode: item.barcode,
    classification: item.classification,
    controlNumber: item.controlNumber,
    indexTermGenre: item.indexTermGenre,
    informationSummary: item.informationSummary,
    language: item.language,
    physicalDescription: item.physicalDescription,
    holdingsInformation: item.holdingsInformation,
    library: item.library,
  })

  const [isLoading, setIsLoading] = useState(false)

  function GetAllBooksHandler() {
    if (router.route == '/catalogs/create') {
      router.push('/catalogs')
    }
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

    if (formData.barcode.length !== 8) {
      setSuccessMessage('Must be 8 characters')
      return false
    }

    try {
      const res = await fetchApi(`/cataloging/${item.barcode}`, 'PUT', formData)
      const { status, message } = res

      if (status) {
        setSuccessMessage(message)
        router.push(`/catalogs/${res.item.barcode}`)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Container>
      <CatalogingForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        goToCatalogPageHandler={GetAllBooksHandler}
        loading={isLoading}
        type='edit'
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

export default EditItemPage

import Box from '@mui/material/Box'

import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'
import Container from '@/components/layout/container'

import BookList from '@/components/cataloging/book-list'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'

import { useAuth } from '@/utils/protectedPage'
import FilterItems from '@/components/cataloging/FilterItems'
import { useState } from 'react'
import { filterCataloging } from '@/utils/filterCataloging'

function CatalogPage(props) {
  const { columns, items } = props

  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState({
    title: '',
    author: '',
    barcode: '',
    classification: '',
    controlNumber: '',
  })

  function handleChange(event) {
    setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value })
  }

  function clearSearchTerm() {
    setSearchTerm({
      title: '',
      author: '',
      barcode: '',
      classification: '',
      controlNumber: '',
    })
  }

  function onListClickHandler(books) {
    // router.push(`/catalogs/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/catalogs/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  const transformedArray = items
    ? items.map((item) => {
        const { barcode, title, author, classification, controlNumber } = item
        return {
          barcode,
          title: title.mainTitle,
          author: author.mainAuthor,
          classification,
          controlNumber,
        }
      })
    : []

  const rows = filterCataloging({ searchTerm, data: transformedArray })

  return (
    <Container>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        width='100%'
        gap={3}
        flexWrap='wrap'
      >
        <FilterItems
          searchTerm={searchTerm}
          clearTerms={clearSearchTerm}
          handleChange={handleChange}
        />
        <Box width={{ xs: '100%', sm: '70%' }}>
          <CatalogFunctionBtns />
          <BookList
            rows={rows}
            onRowDoubleClick={onListClickHandler}
            columns={columns}
          />
        </Box>
      </Box>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const columns = [
    { field: 'barcode', headerName: 'Barcode', width: 100 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'author', headerName: 'Author', width: 150 },
    {
      field: 'classification',
      headerName: 'Classification',
      type: 'number',
      width: 100,
    },
    {
      field: 'controlNumber',
      headerName: 'Control Number',
      width: 100,
    },
  ]

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/cataloging`)
    const { status, items } = res

    if (status) {
      return {
        props: {
          items,
          columns,
        },
      }
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error.message,
        columns,
      },
    }
  }
}

export default CatalogPage

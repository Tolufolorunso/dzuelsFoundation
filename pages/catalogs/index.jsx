import Box from '@mui/material/Box'

import CatalogFunctionBtns from '@/components/cataloging/CatalogFunctionBtns'
import Container from '@/components/layout/container'

import BookList from '@/components/cataloging/BookList'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'

import FilterItems from '@/components/cataloging/FilterItems'
import { filterCataloging } from '@/utils/filterCataloging'
import { useState } from 'react'

import classes from '@/components/cataloging/home.module.css'

function CatalogPage(props) {
  const { items } = props
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
        const {
          barcode,
          title,
          author,
          classification,
          controlNumber,
          isCheckedOut,
        } = item
        return {
          barcode,
          title: title.mainTitle,
          subTitle: title.subtitle,
          author: author.mainAuthor,
          classification,
          controlNumber,
          isCheckedOut,
        }
      })
    : []

  const rows = filterCataloging({ searchTerm, data: transformedArray })

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        width="100%"
        gap={3}
        flexWrap="wrap"
      >
        <FilterItems
          searchTerm={searchTerm}
          clearTerms={clearSearchTerm}
          handleChange={handleChange}
        />
        <Box width={{ xs: '100%', sm: '70%' }}>
          <CatalogFunctionBtns />
          <BookList rows={rows} onRowDoubleClick={onListClickHandler} />
        </Box>
      </Box>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
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
        },
      }
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error.message,
        // columns,
      },
    }
  }
}

export default CatalogPage

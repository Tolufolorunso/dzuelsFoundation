import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'
import Container from '@/components/layout/container'

import BookList from '@/components/cataloging/book-list'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function CatalogPage(props) {
  const { columns } = props
  const router = useRouter()

  function onListClickHandler(books) {
    console.log(13, `/catalogs/${books.row.barcode}`)
    // router.push(`/catalogs/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/catalogs/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  const [isLoadingBooks, setIsLoadingBooks] = useState(true)
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/cataloging')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setBooks(() => {
          const transformedArray = data.map((item) => {
            const { barcode, title, author, classification, controlNumber } =
              item
            const transformedItem = {
              barcode: parseInt(barcode),
              title: title.mainTitle,
              author: author.mainAuthor,
              classification: parseInt(classification),
              controlNumber: parseFloat(controlNumber),
            }
            return transformedItem
          })
          return transformedArray
        })
        setIsLoadingBooks(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <CatalogFunctionBtns />
      <BookList
        rows={books}
        onRowDoubleClick={onListClickHandler}
        columns={columns}
        isLoadingBooks={isLoadingBooks}
      />
    </Container>
  )
}

export async function getStaticProps(ctx) {
  const columns = [
    { field: 'barcode', headerName: 'Barcode', width: 100 },
    { field: 'title', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 150 },
    {
      field: 'classification',
      headerName: 'Classification',
      type: 'number',
      width: 130,
    },
    {
      field: 'controlNumber',
      headerName: 'Control Number',
      width: 150,
    },
  ]

  return {
    props: {
      data: null,
      columns,
    },
  }
}

export default CatalogPage

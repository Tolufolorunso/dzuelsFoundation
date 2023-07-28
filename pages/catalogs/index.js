import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'
import Container from '@/components/layout/container'

import BookList from '@/components/cataloging/book-list'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'

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

  // const transformedArray = items.map((item) => {
  //   const { barcode, title, author, classification, controlNumber } = item
  //   return {
  //     barcode,
  //     title: title.mainTitle,
  //     author: author.mainAuthor,
  //     classification,
  //     controlNumber,
  //   }
  // })

  return (
    <Container>
      <CatalogFunctionBtns />
      <BookList
        rows={[]}
        onRowDoubleClick={onListClickHandler}
        columns={columns}
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

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/cataloging`)
    const { status } = res

    console.log(status)
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

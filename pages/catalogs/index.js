import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'
import Container from '@/components/layout/container'

import BookList from '@/components/cataloging/book-list'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'

import { useAuth } from '@/utils/protectedPage'
import Loading from '@/components/layout/Loading'

function CatalogPage(props) {
  const session = useAuth()
  const { columns, items } = props
  const router = useRouter()

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

  if (!session) {
    // You can also show a loading state or a message here
    return <Loading />
  }

  return (
    <Container>
      <CatalogFunctionBtns />
      <BookList
        rows={transformedArray}
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

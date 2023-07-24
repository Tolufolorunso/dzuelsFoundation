import Container from '@/components/layout/container'
import Aside from '@/components/patron/aside'
import ContentSide from '@/components/patron/content-side'
import CustomHeader from '@/components/typography/custom-header'
import { useRouter } from 'next/router'
import { useState } from 'react'

function PatronsHomePage(props) {
  const { columns } = props
  const router = useRouter()

  function onCellClickHandler(books) {
    console.log(13, `/patrons/${books.row.barcode}`)
    // router.push(`/patrons/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/patrons/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  const [isLoadingPatrons, setIsLoadingPatrons] = useState(true)
  const [patrons, setPatrons] = useState([])

  return (
    <Container>
      <main className='patron-container'>
        <Aside />
        <ContentSide
          rows={patrons}
          onCellClickHandler={onCellClickHandler}
          onRowClick={onCellClickHandler}
          columns={columns}
          isLoadingPatrons={isLoadingPatrons}
        />
      </main>
    </Container>
  )
}

export async function getStaticProps(ctx) {
  const columns = [
    { field: 'barcode', headerName: 'Barcode', width: 100 },
    { field: 'firstname', headerName: 'Firstname', width: 200 },
    { field: 'surname', headerName: 'Surname', width: 200 },
    {
      field: 'patronType',
      headerName: 'patronType',
      width: 130,
    },
  ]

  return {
    props: {
      data: null,
      columns,
    },
  }
}

export default PatronsHomePage

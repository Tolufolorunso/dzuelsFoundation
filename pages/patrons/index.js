import Container from '@/components/layout/container'
import Aside from '@/components/patron/aside'
import ContentSide from '@/components/patron/content-side'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function PatronsHomePage(props) {
  const setErrorMessage = useAppStore((state) => state.setErrorMessage)
  const { columns } = props
  const router = useRouter()

  function onCellClickHandler(books) {
    // console.log(13, `/patrons/${books.row.barcode}`)
    // router.push(`/patrons/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/patrons/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  const [isLoadingPatrons, setIsLoadingPatrons] = useState(true)
  const [patrons, setPatrons] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingPatrons(true)
        const res = await fetchApi('/patrons')
        const { status, patrons } = res
        if (status) {
          setPatrons(patrons)
        } else {
          throw new Error('Error occurred while fetching')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrorMessage(error.message)
      } finally {
        setIsLoadingPatrons(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      headerName: 'Patron Type',
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

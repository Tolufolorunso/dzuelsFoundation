import Container from '@/components/layout/container'
import Aside from '@/components/patron/aside'
import ContentSide from '@/components/patron/content-side'
import fetchApi from '@/utils/fetchApi'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import usePatronStore from '@/store/patronStore'
import { getSession } from 'next-auth/react'

function PatronsHomePage(props) {
  const setAllPatrons = usePatronStore((state) => state.setAllPatrons)
  const { columns, errorMessage, patrons } = props
  const router = useRouter()

  if (!errorMessage) {
    setAllPatrons(patrons)
  }

  function onCellClickHandler(books) {
    // router.push(`/patrons/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/patrons/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  return (
    <Container>
      <main className='patron-container'>
        <Aside />
        {errorMessage ? (
          <Box
            sx={{
              width: '100%',
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6' color='error'>
              {errorMessage}
            </Typography>
          </Box>
        ) : (
          <ContentSide
            rows={patrons}
            onCellClickHandler={onCellClickHandler}
            onRowClick={onCellClickHandler}
            columns={columns}
          />
        )}
      </main>
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

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/patrons`)
    const { status, patrons } = res

    if (status) {
      return {
        props: {
          patrons,
          columns,
        },
      }
    } else {
      throw new Error('Error occurred while fetching')
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

export default PatronsHomePage

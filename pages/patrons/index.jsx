import Container from '@/components/layout/container'
import ContentSide from '@/components/patron/ContentSide'
import fetchApi from '@/utils/fetchApi'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import usePatronStore from '@/store/patronStore'
import { getSession } from 'next-auth/react'
import useAppStore from '@/store/applicationStateStore'

import AwardPoints from '@/components/patron/AwardPoints'
import SearchPatron from '@/components/patron/SearchPatron'
import { filterPatrons } from '@/utils/filterPatrons'
import { useState } from 'react'
import { exportToExcel } from '@/utils/export'

function PatronsHomePage(props) {
  const setPatrons = usePatronStore((state) => state.setAllPatrons)
  // const searchTerm = usePatronStore((state) => state.patrons.searchTerm)
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  const { columns, errorMessage, patrons } = props
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState({
    patronType: 'any',
    surname: '',
    firstname: '',
    barcode: '',
  })

  function handleChange(event) {
    setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value })
  }

  if (!errorMessage) {
    setPatrons(patrons)
  }

  const rows = filterPatrons({ searchTerm, data: patrons })

  // console.log(rows, patrons)

  function onRowClickHandler(item) {
    router.push({
      pathname: `/patrons/${item.row.barcode}`,
      // query: { confirm: true },
    })
  }

  function clearTerms() {
    setSearchTerm({
      patronType: 'any',
      surname: '',
      firstname: '',
      barcode: '',
    })
  }

  async function exportToExcelFrontend(type) {
    const filename = searchTerm.patronType === 'any' ? "dzuels-patrons-details" :  'dzuels-' + searchTerm.patronType + "-details"
    if (type === 'detail') {
      try {
        const patronType =
          searchTerm?.patronType === 'any' ? '' : searchTerm?.patronType
        const firstname = searchTerm.firstname
        const surname = searchTerm.surname
        const barcode = searchTerm.barcode

        const res = await fetchApi(
          `/patrons?mode=detail&patronType=${patronType}&firstname=${firstname}&surname=${surname}&barcode=${barcode}`
        )
        const { status, patrons } = res
        if (status) {
          setSuccessMessage('Your file is ready to be downloaded in 2 seconds.')

          const flattenedArray = patrons.map((patron) => {
            const { address, studentSchoolInfo, parentInfo, ...rest } = patron
            return {
              ...rest,
              ...address,
              ...studentSchoolInfo,
              ...parentInfo,
            }
          })
          setTimeout(() => {
            setSuccessMessage('')
            exportToExcel(flattenedArray,filename)
          }, 2000)
        }
      } catch (error) {
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      }
    }
  }

  return (
    <Container>
      <main className='patron-container'>
        <div className='sticky'>
          <SearchPatron
            handleChange={handleChange}
            searchTerm={searchTerm}
            clearTerms={clearTerms}
          />
          <AwardPoints />
        </div>

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
            rows={rows}
            onRowClick={onRowClickHandler}
            columns={columns}
            exportToExcel={exportToExcelFrontend}
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
    { field: 'firstname', headerName: 'Firstname', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone-No', width: 150 },
    {
      field: 'patronType',
      headerName: 'Patron Type',
      width: 150,
    },
    { field: 'points', headerName: 'Points', width: 150 },
  ]

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    console.log(`${endpoint}/patrons`);
    const res = await fetchApi(`${endpoint}/patrons`)
    const { status, patrons } = res

    if (status) {
      return {
        props: {
          user: {
            username: session.user.username,
            role: session.user.role,
            name: session.user.name,
          },
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

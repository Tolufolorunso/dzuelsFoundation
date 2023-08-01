import Container from '@/components/layout/container'
import Aside from '@/components/patron/aside'
import ContentSide from '@/components/patron/content-side'
import fetchApi from '@/utils/fetchApi'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import usePatronStore from '@/store/patronStore'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useAppStore from '@/store/applicationStateStore'

import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function PatronsHomePage(props) {
  const setPatrons = usePatronStore((state) => state.setAllPatrons)
  const searchTerm = usePatronStore((state) => state.patrons.searchTerm)
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  const { columns, errorMessage, patrons } = props
  const router = useRouter()

  const exportToExcel = (data) => {
    console.log(5, data)
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(dataBlob, 'data.xlsx')
  }

  // const [fil]

  if (!errorMessage) {
    setPatrons(patrons)
  }

  function onCellClickHandler(books) {
    // router.push(`/patrons/${books.row.barcode}`, books.row)
    router.push({
      pathname: `/patrons/${books.row.barcode}`, // not router.asPath
      // query: { confirm: true },
    })
  }

  async function exportToExcelFrontend(type) {
    if (type === 'detail') {
      try {
        const res = await fetchApi(
          `/patrons?mode=detail&patronType=${searchTerm?.patronType}`
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
            exportToExcel(flattenedArray)
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

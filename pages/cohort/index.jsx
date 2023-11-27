import StudentsPage from '@/components/cohort/StudentsPage'
import Container from '@/components/layout/container'
import { BASEURL } from '@/lib/contant'
import useCohortStore from '@/store/cohortStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { authOptions } from '../api/auth/[...nextauth]'

function CohortClassPage(props) {
  const { patrons, barcodes } = props
  const [students, setStudents] = useState(patrons || [])
  const [studentBarcodes, setStudentBarcodes] = useState(barcodes)

  const [cohortType, setCohortType] = useState('cohortOne')

  async function handleChange(event) {
    setCohortType(event.target.value)
  }

  // set all cohort class student barcodes in global state management
  const setStudentsInStore = useCohortStore((state) => state.setStudents)
  setStudentsInStore(studentBarcodes)

  useEffect(() => {
    async function fetchStudents(event) {
      try {
        const res = await fetchApi(`/cohort?cohortType=${cohortType}`)
        const { status, message, patrons } = res
        if (status) {
          setStudents(patrons)
          const barcodesArray = patrons.map((student) => student.barcode)
          setStudentBarcodes(barcodesArray)
          setStudentsInStore(barcodesArray)
        }
      } catch (error) {
        toast.error(error.messsage)
      }
    }
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cohortType])

  return (
    <Container>
      <StudentsPage
        students={students}
        onChange={handleChange}
        cohortType={cohortType}
      />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx)
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  try {
    const res = await fetchApi(`${BASEURL}/cohort?cohortType=cohortOne`)
    const { status, patrons } = res

    const barcodesArray = patrons.map((student) => student.barcode)

    if (status) {
      return {
        props: {
          patrons,
          barcodes: barcodesArray,
        },
      }
    } else {
      throw new Error('Error occurred while fetching')
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error.message,
      },
    }
  }
}

export default CohortClassPage

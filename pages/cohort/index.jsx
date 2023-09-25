import StudentsPage from '@/components/cohort/StudentsPage'
import Container from '@/components/layout/container'
import useCohortStore from '@/store/cohortStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function CohortClassPage(props) {
  const { patrons, barcodes } = props
  const [students, setStudents] = useState(patrons || [])
  const [studentBarcodes, setStudentBarcodes] = useState(barcodes)

  const [cohortType, setCohortType] = useState('cohortOne');

  async function handleChange(event) {
    setCohortType(event.target.value);
  };


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
    };
    fetchStudents()
  }, [cohortType])

  return (
    <Container>
      <StudentsPage students={students} onChange={handleChange} cohortType={cohortType} />
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

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/cohort?cohortType=cohortOne`)
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

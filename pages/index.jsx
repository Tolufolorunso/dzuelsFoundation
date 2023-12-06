import EventAttendanceModal from '@/components/home/EventAttendanceModal'
import Home from '@/components/home/Home'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [studentBarcode, setStudentBarcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const studentBarcodeRef = useRef(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [points, setPoints] = useState(0)

  const event = {
    eventTitle: 'Literacy Intervention',
    eventDescription: 'Literacy Intervention classes started',
    eventPoint: 0,
  }

  function openEventHandler() {
    setIsModalOpen(!isModalOpen)
  }

  function closeEventHandler() {
    setIsModalOpen(false)
  }

  async function markStudentHandler() {
    if (!studentBarcode || !date) {
      toast.error('Enter all fields')
      studentBarcodeRef.current.focus()
      return false
    }

    setIsLoading(true)

    try {
      const res = await fetchApi('/events', 'POST', {
        barcode: studentBarcode,
        points,
        date,
        eventTitle: event.eventTitle,
      })
      const { status, message } = res
      if (status) {
        toast.success(message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setStudentBarcode('')
      studentBarcodeRef.current.focus()
      setIsLoading(false)
      // setTimeout(() => {
      //   clearMessage()
      // }, 1500)
    }
  }

  return (
    <>
      <EventAttendanceModal
        open={isModalOpen}
        onClose={closeEventHandler}
        event={event}
        studentBarcode={studentBarcode}
        studentBarcodeRef={studentBarcodeRef}
        setStudentBarcode={setStudentBarcode}
        loading={isLoading}
        markStudent={markStudentHandler}
      />
      <Home
        onClick={openEventHandler}
        event={event}
        date={date}
        setDate={setDate}
        point={points}
        setPoint={setPoints}
        birthDayColumns={[]}
        birthdayData={[]}
        handleBirthDayRowClick={() => 'hello'}
      />
    </>
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

  const BASE_URL =
    process.env.NEXT_ENV === 'development'
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL

  try {
    const res = await fetchApi(`${BASE_URL}/events/birth`)
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

export default HomePage

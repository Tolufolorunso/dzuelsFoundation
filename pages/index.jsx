import EventAttendanceModal from '@/components/home/EventAttendanceModal'
import Home from '@/components/home/Home'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

const HomePage = () => {
  const { setErrorMessage, setSuccessMessage, clearMessage } = useAppStore(
    (state) => state
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [studentBarcode, setStudentBarcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const studentBarcodeRef = useRef(null)
  const [date, setDate] = useState('2023-08-10')
  const [points, setPoints] = useState(0)

  const event = {
    eventName: 'Event: Teacher Training',
    eventDescription: 'Teacher Training at the AAoJ Memorial Learning Center',
    eventPoint: 2,
  }

  function openEventHandler() {
    setIsModalOpen(!isModalOpen)
  }

  function closeEventHandler() {
    setIsModalOpen(false)
  }

  async function markStudentHandler() {
    if (!studentBarcode || !date) {
      setErrorMessage('Enter all fields')
      return false
    }

    setIsLoading(true)

    try {
      const res = await fetchApi('/events', 'POST', {
        barcode: studentBarcode,
        points,
        date,
      })
      const { status, message } = res
      if (status) {
        setSuccessMessage(message)
      }
    } catch (error) {
      setErrorMessage(error.message)
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
      />
    </>
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

  return {
    props: {
      user: {
        username: session.user.username,
        role: session.user.role,
        name: session.user.name,
      },
    },
  }
}

export default HomePage

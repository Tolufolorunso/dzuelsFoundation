import CheckinContent from '@/components/circulation/CheckinContent'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'

function Checkin() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  async function checkinHandler(checkinData) {
    try {
      const res = await fetchApi('/circulation/checkin', 'POST', checkinData)
      const { status, successMessage, checkedInData } = res
      if (status) {
        setSuccessMessage(successMessage)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return (
    <Container>
      <CheckinContent checkinHandler={checkinHandler} />
    </Container>
  )
}

export default Checkin

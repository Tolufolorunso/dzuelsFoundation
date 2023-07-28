import CheckoutContent from '@/components/circulation/CheckoutContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import useCirculationStore from '@/store/circulationStore'
import usePatronStore from '@/store/patronStore'
import fetchApi from '@/utils/fetchApi'
import { useEffect } from 'react'

function Checkout() {
  const setErrorMessage = useAppStore((state) => state.setErrorMessage)
  const setPatron = useCirculationStore((state) => state.setPatron)

  async function getPatron(patronBarcode, type) {
    if (type === 'patron') {
      try {
        const data = await fetchApi(
          `/circulation/checkout?patronBarcode=${patronBarcode}`
        )
        setPatron(data.patron)
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <Container>
      <HomePageTopHeading />
      <CheckoutContent getPatron={getPatron} />
    </Container>
  )
}

export default Checkout

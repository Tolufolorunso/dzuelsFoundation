import Container from '@/components/layout/container'
import Aside from '@/components/patron/aside'
import ContentSide from '@/components/patron/content-side'
import CustomHeader from '@/components/typography/custom-header'

function PatronsHomePage() {
  return (
    <Container>
      <main className='patron-container'>
        <Aside />
        <ContentSide />
      </main>
    </Container>
  )
}

export default PatronsHomePage

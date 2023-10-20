import { useRouter } from 'next/router'
import OverdueList from './OverdueList'

function OverduePage(props) {
  const { overdueItems } = props
  const router = useRouter()

  function getOverDuePatron(barcode) {
    router.push('/patrons/' + barcode)
  }

  return (
    <div style={{ marginBottom: '6rem' }}>
      <OverdueList
        overdueItems={overdueItems}
        getOverDuePatron={getOverDuePatron}
      />
    </div>
  )
}

export default OverduePage

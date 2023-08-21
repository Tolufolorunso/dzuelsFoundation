import OverdueList from './OverdueList'

function OverduePage(props) {
  const { overdueItems } = props

  return (
    <div style={{ marginBottom: '6rem' }}>
      <OverdueList overdueItems={overdueItems} />
    </div>
  )
}

export default OverduePage

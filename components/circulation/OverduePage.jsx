import OverdueList from './OverdueList'

function OverduePage(props) {
  const { overdueItems } = props

  // console.log(16, overdueItems)

  return (
    <div style={{ marginBottom: '6rem' }}>
      <OverdueList overdueItems={overdueItems} />
    </div>
  )
}

export default OverduePage

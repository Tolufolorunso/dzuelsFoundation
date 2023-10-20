import HoldsLists from './HoldsLists'

function HoldsPage(props) {
  const { holds } = props

  return (
    <div style={{ marginBottom: '6rem' }}>
      <HoldsLists holds={holds} />
    </div>
  )
}

export default HoldsPage

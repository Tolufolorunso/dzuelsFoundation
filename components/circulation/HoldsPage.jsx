import HoldsLists from './HoldsLists'

function HoldsPage(props) {
  const { holds } = props

  return (
    <div>
      <HoldsLists holds={holds} />
    </div>
  )
}

export default HoldsPage

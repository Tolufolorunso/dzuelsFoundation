import HoldsLists from './HoldsLists'

function HoldsPage(props) {
  const { holds } = props
  console.log(holds)
  return (
    <div>
      <HoldsLists holds={holds} />
    </div>
  )
}

export default HoldsPage

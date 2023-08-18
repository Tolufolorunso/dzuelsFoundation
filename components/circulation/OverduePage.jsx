import OverdueList from './OverdueList'

function OverduePage(props) {
  const { itemsOverdue } = props

  return (
    <div>
      <OverdueList itemsOverdue={itemsOverdue} />
    </div>
  )
}

export default OverduePage

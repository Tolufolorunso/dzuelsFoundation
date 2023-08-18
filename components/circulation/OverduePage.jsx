import OverdueList from './OverdueList'

function OverduePage(props) {
  const { itemsOverdue } = props

  return (
    <div style={{ marginBottom: '6rem' }}>
      <OverdueList itemsOverdue={itemsOverdue} />
    </div>
  )
}

export default OverduePage

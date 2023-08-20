import classes from './content-side.module.css'
import PatronFunctionBtns from './PatronFunctionBtns'
import PatronList from './PatronList'

function ContentSide(props) {
  return (
    <article className={classes.patron}>
      <PatronFunctionBtns exportToExcel={props.exportToExcel} />
      <PatronList {...props} />
    </article>
  )
}

export default ContentSide

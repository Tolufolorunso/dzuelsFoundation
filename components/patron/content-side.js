import classes from './content-side.module.css'
import PatronFunctionBtns from './patron-function-btns'
import PatronList from './patron-list'

function ContentSide(props) {
  return (
    <article className={classes.patron}>
      <PatronFunctionBtns exportToExcel={props.exportToExcel} />
      <PatronList {...props} />
    </article>
  )
}

export default ContentSide

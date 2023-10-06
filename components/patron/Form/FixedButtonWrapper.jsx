import classes from '../style/FormPatron.module.css'

function FixedButtonWrapper({ children }) {
  return <div className={classes.fixedButtonWrapper}>{children}</div>
}

export default FixedButtonWrapper

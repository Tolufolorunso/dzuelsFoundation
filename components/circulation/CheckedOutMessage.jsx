import Box from '@mui/material/Box'
import classes from './Circulation.module.css'

function CheckedOutMessage(props) {
  const { title, dueDate, itemBarcode } = props
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <p className={classes.checkingHeader}>
        Checked Out: {title} ({itemBarcode}). Due on {dueDate}
      </p>
    </Box>
  )
}

export default CheckedOutMessage

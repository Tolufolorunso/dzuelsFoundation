import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import classes from './styles.module.css'

function PatronProfileHeader(props) {
  const { imageUrl, text } = props
  return (
    <Card className={classes.card}>
      <CardMedia component="img" alt={text} height="300" image={imageUrl} />
      {/* <Typography variant="h6" className={classes.textOverlay}>
        Dzuels
      </Typography> */}
      <div className={classes.overlay}>
        <Typography variant="h6" className={classes.text}>
          {text}
        </Typography>
      </div>
    </Card>
  )
}

export default PatronProfileHeader

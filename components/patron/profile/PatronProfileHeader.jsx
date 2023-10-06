import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

function PatronProfileHeader(props) {
  const { imageUrl, alt } = props
  return (
    <Card>
      <CardMedia component="img" alt={alt} height="300" image={imageUrl} />
    </Card>
  )
}

export default PatronProfileHeader

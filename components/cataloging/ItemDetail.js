import { Box, Typography, Button, Container, Paper, Grid } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ItemDetail = (props) => {
  const { item } = props
  const {
    title,
    imgUrl,
    author,
    publicationInfo,
    ISBN,
    classification,
    barcode,
    indexTermGenre,
    isCheckedOut,
  } = item

  const router = useRouter()

  function clickHandler(to) {
    if (to.includes('edit')) {
      router.push({
        pathname: to,
        query: {
          mainTitle: title.mainTitle,
          subtitle: title.subtitle,
          mainAuthor: author.mainAuthor,
          additionalAuthors: author?.additionalAuthors.join(', '),
          publisher: publicationInfo.publisher,
          place: publicationInfo.place,
          year: publicationInfo.year,
          indexTermGenre: indexTermGenre.join(', '),
          ...item,
        },
      })
      return
    }
    router.push(to)
  }

  const defaultImageUrl = '/images/book-default.jpg'

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f3f4f4' }}>
        <Grid container spacing={2}>
          {/* Top Section */}
          <Grid item xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h4' color='#6a0406'>
                {title.mainTitle}
              </Typography>
              <Box>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginRight: 2 }}
                >
                  Check Out
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginRight: 2 }}
                >
                  Check In
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginRight: 2 }}
                  onClick={() => clickHandler('/catalogs/edit')}
                >
                  Edit
                </Button>
                <Button variant='contained' color='secondary'>
                  Delete
                </Button>
              </Box>
            </Box>
            {title.subtitle && (
              <Typography variant='subtitle1'>{title.subtitle}</Typography>
            )}
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Image
              src={imgUrl || defaultImageUrl}
              alt={title.mainTitle}
              width={500}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant='body1' color='#6a0406'>
              <strong>Author:</strong> {author.mainAuthor}
            </Typography>
            {author.additionalAuthors &&
              author.additionalAuthors.length > 0 && (
                <Typography variant='body1' color='#6a0406'>
                  <strong>Additional Authors:</strong>{' '}
                  {author.additionalAuthors.join(', ')}
                </Typography>
              )}
            <Typography variant='body1' color='#6a0406'>
              <strong>Publisher:</strong> {publicationInfo.publisher}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>Place:</strong> {publicationInfo.place}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>Year:</strong> {publicationInfo.year}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>ISBN:</strong> {ISBN}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>Classification:</strong> {classification}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>Barcode:</strong> {barcode}
            </Typography>
            <Typography variant='body1' color='#6a0406'>
              <strong>Holdings Information:</strong> {item.holdingsInformation}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default ItemDetail

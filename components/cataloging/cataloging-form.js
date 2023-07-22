import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import classes from './cataloging-form.module.css'
import CustomHeader from '../typography/custom-header'

function CatalogingForm(props) {
  const { handleSubmit, formData, handleChange, goToCatalogPageHandler } = props

  return (
    <Box
      maxWidth={750}
      width='100%'
      style={{
        margin: '0 auto 3rem auto',
        // border: '1px solid rgba(45, 45, 45, 0.7)',
        backgroundColor: 'rgba(255, 255, 255)',
        borderRadius: '5px',
        padding: '2rem 4rem',
      }}
    >
      <CustomHeader level={2} text='Add a book' />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <fieldset className={classes.fieldset}>
              <legend>Title:</legend>
              <Grid item xs={12}>
                <TextField
                  label='Title'
                  variant='outlined'
                  fullWidth
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Subitle'
                  variant='outlined'
                  fullWidth
                  name='subtitle'
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={12}>
            <fieldset className={classes.fieldset}>
              <legend>Author(s):</legend>
              <Grid item xs={12}>
                <TextField
                  label='Main Author'
                  variant='outlined'
                  fullWidth
                  name='mainAuthor'
                  value={formData.mainAuthor}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Additional Author'
                  variant='outlined'
                  fullWidth
                  name='additionalAuthor'
                  value={formData.additionalAuthor}
                  onChange={handleChange}
                />
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={12}>
            <fieldset className={classes.fieldset}>
              <legend>Publication Info:</legend>
              <Grid item xs={12}>
                <TextField
                  label='Publisher'
                  variant='outlined'
                  fullWidth
                  name='publisher'
                  value={formData.publisher}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Place'
                  variant='outlined'
                  fullWidth
                  name='place'
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Year'
                  variant='outlined'
                  fullWidth
                  name='year'
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </fieldset>
          </Grid>

          <Grid item xs={12}>
            <fieldset className={classes.fieldset}>
              <legend>General:</legend>
              <Grid item xs={12}>
                <TextField
                  label='ISBN'
                  variant='outlined'
                  fullWidth
                  name='ISBN'
                  value={formData.ISBN}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Classification'
                  variant='outlined'
                  fullWidth
                  name='classification'
                  value={formData.classification}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Control Number'
                  variant='outlined'
                  fullWidth
                  name='controlNumber'
                  value={formData.controlNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Index Term-Genre/Form'
                  variant='outlined'
                  fullWidth
                  name='indexTermGenre'
                  value={formData.indexTermGenre}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='General information'
                  variant='outlined'
                  fullWidth
                  name='informationSummary'
                  value={formData.informationSummary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Language'
                  variant='outlined'
                  fullWidth
                  name='language'
                  value={formData.language}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label='Barcode'
                  variant='outlined'
                  fullWidth
                  name='barcode'
                  value={formData.barcode}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Physical Description'
                  variant='outlined'
                  fullWidth
                  name='physicalDescription'
                  value={formData.physicalDescription}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Subject Headings'
                  variant='outlined'
                  fullWidth
                  name='subjectHeadings'
                  value={formData.subjectHeadings}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Holdings Information'
                  variant='outlined'
                  fullWidth
                  name='holdingsInformation'
                  value={formData.holdingsInformation}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </fieldset>
          </Grid>

          {/* <Grid item xs={12}>
            <fieldset className={classes.fieldset}>
              <legend>Author(s):</legend>
            </fieldset>
          </Grid> */}
        </Grid>

        <div style={{ margin: '1rem 0 1rem 0' }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            // className={classes.btn}
          >
            Add Book
          </Button>
          <Button
            type='button'
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem', marginLeft: '5px' }}
            onClick={goToCatalogPageHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default CatalogingForm

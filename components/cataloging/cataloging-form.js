import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import CustomHeader from '../typography/custom-header'
import FieldSetFormLayout from '../layout/field-set-layout'
import CustomGridInput from '../layout/custom-grid-input'
import FormContainer from '../layout/form-container'

function CatalogingForm(props) {
  const {
    handleSubmit,
    formData,
    handleChange,
    goToCatalogPageHandler,
    loading,
  } = props

  return (
    <FormContainer>
      <CustomHeader level={2} text='Add a book' />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <FieldSetFormLayout legend='Title'>
            <CustomGridInput
              label='Title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Subitle'
              name='subtitle'
              value={formData.subtitle}
              onChange={handleChange}
            />
          </FieldSetFormLayout>
          <FieldSetFormLayout legend='Author(s)'>
            <CustomGridInput
              label='Main Author'
              name='mainAuthor'
              value={formData.mainAuthor}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Additional Authors'
              name='additionalAuthors'
              value={formData.additionalAuthors}
              onChange={handleChange}
            />
          </FieldSetFormLayout>

          <FieldSetFormLayout legend='Publication Info'>
            <CustomGridInput
              label='Publisher'
              name='publisher'
              value={formData.publisher}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Place'
              name='place'
              value={formData.place}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Year'
              name='year'
              value={formData.year}
              onChange={handleChange}
              required
            />
          </FieldSetFormLayout>

          <FieldSetFormLayout legend='General'>
            <CustomGridInput
              label='ISBN'
              name='ISBN'
              value={formData.ISBN}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Classification'
              name='classification'
              value={formData.classification}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Control Number'
              name='controlNumber'
              value={formData.controlNumber}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Index Term-Genre/Form'
              name='indexTermGenre'
              value={formData.indexTermGenre}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='General information'
              name='informationSummary'
              value={formData.informationSummary}
              onChange={handleChange}
            />
            <CustomGridInput
              label='Language'
              name='language'
              value={formData.language}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Barcode'
              name='barcode'
              value={formData.barcode}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Physical Description'
              name='physicalDescription'
              value={formData.physicalDescription}
              onChange={handleChange}
            />

            <CustomGridInput
              label='Holdings Information'
              name='holdingsInformation'
              value={formData.holdingsInformation}
              onChange={handleChange}
              required
            />
            <CustomGridInput
              label='Library'
              name='library'
              value={formData.library}
              onChange={handleChange}
              required
            />
          </FieldSetFormLayout>
        </Grid>

        <div style={{ margin: '1rem 0 1rem 0' }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            // className={classes.btn}
          >
            {loading ? (
              <>
                <CircularProgress size={10} color='inherit' />
                <span style={{ marginLeft: '5px' }}>Saving...</span>
              </>
            ) : (
              'Add Book'
            )}
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
    </FormContainer>
  )
}

export default CatalogingForm

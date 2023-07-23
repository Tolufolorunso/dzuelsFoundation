import classes from './patron-form.module.css'
import FieldSetFormLayout from '../layout/field-set-layout'
import CustomGridInput from '../layout/custom-grid-input'
import FormContainer from '../layout/form-container'

function PatronForm(props) {
  const { handleSubmit, formData, handleChange, goToCatalogPageHandler } = props
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FieldSetFormLayout legend='Patron Detail'>
          <CustomGridInput
            label='Surname'
            name='surname'
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <CustomGridInput
            label='FirstName'
            name='firstname'
            value={formData.firname}
            onChange={handleChange}
            required
          />
        </FieldSetFormLayout>
      </form>
    </FormContainer>
  )
}

export default PatronForm

import classes from './patron-form.module.css'
import FieldSetFormLayout from '../layout/field-set-layout'
import CustomGridInput from '../layout/custom-grid-input'
import FormContainer from '../layout/form-container'
import { formFields } from './patron-fields-data'

function PatronForm(props) {
  const { handleSubmit, formData, handleChange, goToCatalogPageHandler } = props
  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
      >
        {formFields.map((fieldset, index) => (
          <FieldSetFormLayout key={index} legend={fieldset.legend}>
            {fieldset.inputs.map((input, inputIndex) => (
              <CustomGridInput
                key={inputIndex}
                label={input.label}
                type={input.type}
                name={input.name}
                value={formData[input.name] || ''}
                onChange={handleChange} // Assuming you have the handleChange function to update the form data.
                required={input.required}
              />
            ))}
          </FieldSetFormLayout>
        ))}
        {/* <FieldSetFormLayout legend='Patron Detail'>
          <CustomGridInput
            label='Surname'
            name='surname'
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <CustomGridInput
            label='Firstname'
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <CustomGridInput
            label='Middlename'
            name='middlename'
            value={formData.middlename}
            onChange={handleChange}
          />
          <CustomGridInput
            label='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <CustomGridInput
            label='Phone Number'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <CustomGridInput
            label='Gender'
            type='select'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FieldSetFormLayout>
        <FieldSetFormLayout legend='Patron Address'>
          <CustomGridInput
            label='Street'
            type='select'
            name='street'
            value={formData.street}
            onChange={handleChange}
          />
          <CustomGridInput
            label='City'
            type='select'
            name='city'
            value={formData.city}
            onChange={handleChange}
          />
          <CustomGridInput
            label='State'
            type='select'
            name='state'
            value={formData.state}
            onChange={handleChange}
          />
          <CustomGridInput
            label='Zip Code'
            type='select'
            name='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
          />
          <CustomGridInput
            label='Country'
            type='select'
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
        </FieldSetFormLayout> */}
      </form>
    </FormContainer>
  )
}

export default PatronForm

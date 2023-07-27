import FieldSetFormLayout from '../layout/field-set-layout'
import CustomGridInput from '../layout/custom-grid-input'
import FormContainer from '../layout/form-container'
import { formFields } from './patron-fields-data'
import usePatronStore from '@/store/patronStore'

function PatronForm(props) {
  const { handleSubmit, formData, handleChange, goToCatalogPageHandler } = props

  const patronType = usePatronStore((state) => state.patrons.selectedPatronType)

  let requiredFormFields = formFields.filter((fields) => {
    if (patronType === 'student') {
      return fields.type === 'all' || fields.type === 'student'
    } else if (patronType === 'guest') {
      return fields.type === 'all'
    } else {
      return fields.type === 'all' || fields.type === 'employer'
    }
  })

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
      >
        {requiredFormFields.map((fieldset, index) => {
          if (fieldset.legend)
            return (
              <FieldSetFormLayout key={index} legend={fieldset.legend}>
                {fieldset.inputs.map((input, inputIndex) => {
                  return (
                    <CustomGridInput
                      key={inputIndex}
                      label={input.label}
                      type={input.type}
                      name={input.name}
                      value={formData[input.name] || ''}
                      onChange={handleChange}
                      required={input.required}
                      placeholder={input.placeholder}
                    />
                  )
                })}
              </FieldSetFormLayout>
            )
        })}
      </form>
    </FormContainer>
  )
}

export default PatronForm

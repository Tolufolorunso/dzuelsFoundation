import { useState } from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CustomHeader from '@/components/typography/CustomHeader'
import classes from '../style/FormPatron.module.css'
import FixedButtonWrapper from '../Form/FixedButtonWrapper'
import { useEffect } from 'react'
import fetchApi from '@/utils/fetchApi'
import { formFields } from './PatronFieldsData'
import FormContainer from '@/components/layout/form-container'
import FieldSetFormLayout from '@/components/layout/field-set-layout'
import CustomGridInput from '@/components/layout/custom-grid-input'

function EditForm(props) {
  const {
    patronBarcode,
    patronData,
    formData,
    handleSubmit,
    handleChange,
    setFormData,
    isLoading,
    handleCancelClick,
  } = props
  const [patronType, setPatronType] = useState(patronData?.patronType)

  let requiredFormFields = formFields.filter((fields) => {
    if (patronType === 'student') {
      return fields.type === 'all' || fields.type === 'student'
    } else if (patronType === 'guest') {
      return fields.type === 'all'
    } else {
      return fields.type === 'all' || fields.type === 'employer'
    }
  })

  useEffect(() => {
    async function fetchPatronData() {
      if (patronData) {
        setFormData((prevData) => ({
          ...prevData,
          ...patron.address,
          ...patron.parentInfo,
          ...patron.studentSchoolInfo,
          ...patron,
        }))
      } else {
        try {
          const res = await fetchApi(`/patrons/${patronBarcode}`)
          const { status, patron } = res

          if (status) {
            setFormData((prevData) => ({
              ...prevData,
              ...patron.address,
              ...patron.parentInfo,
              ...patron.studentSchoolInfo,
              ...patron,
            }))
            setPatronType(patron.patronType)
          }
        } catch (error) {
          // error
        }
      }
    }
    fetchPatronData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patronBarcode])

  return (
    <div className={classes.form}>
      <CustomHeader level={4} text={`Edit Patron`} />
      <FixedButtonWrapper>
        <Stack
          spacing={2}
          direction="row"
          // style={{ position: 'absolute', top: 0 }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            startIcon={isLoading ? null : <SaveAltIcon />}
          >
            {isLoading ? (
              <>
                <CircularProgress size={10} color="inherit" />
                <span style={{ marginLeft: '5px' }}>Updating...</span>
              </>
            ) : (
              'Update'
            )}
          </Button>
          <Button variant="text" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Stack>
      </FixedButtonWrapper>
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
    </div>
  )
}

export default EditForm

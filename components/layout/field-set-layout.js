import Grid from '@mui/material/Grid'

function FieldSetFormLayout(props) {
  const { children, legend } = props
  return (
    <Grid item xs={12}>
      <fieldset
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 1.5rem',
        }}
      >
        <legend>{legend}: </legend>
        {children}
      </fieldset>
    </Grid>
  )
}

export default FieldSetFormLayout

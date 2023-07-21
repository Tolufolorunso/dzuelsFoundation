import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function CustomInput({ label, name, formData, handleChange }) {
  return (
    <Grid item xs={12}>
      <TextField
        label={label}
        variant='outlined'
        fullWidth
        name={name}
        value={formData.title}
        onChange={handleChange}
        required
      />
    </Grid>
  )
}

export default CustomInput

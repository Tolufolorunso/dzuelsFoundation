import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function CustomGridInput({ label, name, value, onChange, required }) {
  return (
    <Grid item xs={12}>
      <TextField
        label={label}
        variant='outlined'
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Grid>
  )
}

export default CustomGridInput

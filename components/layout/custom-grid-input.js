import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function CustomGridInput({ label, name, value, onChange, type, required }) {
  if (type === 'select') {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            labelId={name}
            id={name}
            name={name}
            value={value}
            label={label}
            onChange={onChange}
          >
            {/* <MenuItem value='' selected disabled>
              Select
            </MenuItem> */}
            <MenuItem value='male' selected>
              Male
            </MenuItem>
            <MenuItem value='female'>Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )
  }
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

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
          <InputLabel id='gender'>Age</InputLabel>
          <Select
            labelId='gender'
            id='gender'
            value={value}
            label='Gender'
            onChange={onChange}
          >
            <MenuItem value='none' selected disabled>
              None
            </MenuItem>
            <MenuItem value='male'>Male</MenuItem>
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

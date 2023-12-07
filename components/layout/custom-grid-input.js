import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { schools } from '@/data/schools'

function CustomGridInput(props) {
  const { label, name, value, onChange, type, required, placeholder } = props
  if (type === 'select' && name === 'gender') {
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
            <MenuItem value="male" selected>
              Male
            </MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )
  }

  if (type === 'select' && name === 'schoolName') {
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
            {schools.map((school) => (
              <MenuItem value={school.name} key={school.name}>
                {school.name.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    )
  }

  return (
    <Grid item xs={12}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </Grid>
  )
}

export default CustomGridInput

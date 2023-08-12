import TextField from '@mui/material/TextField'

function FilterTextField(props) {
  const { label, name, value, placeholder, onChange } = props

  return (
    <TextField
      hiddenLabel={false}
      fullWidth
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      size='small'
      autoComplete='off'
    />
  )
}

export default FilterTextField

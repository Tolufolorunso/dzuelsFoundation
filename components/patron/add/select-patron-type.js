import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

function SelectPatronType(props) {
  const { patronType, changePatronTypeHandler } = props
  return (
    <FormControl
      component='fieldset'
      style={{ display: 'flex', marginTop: '2rem' }}
    >
      <FormLabel
        component='legend'
        style={{ fontSize: '1.6rem', marginBottom: '-5px' }}
      >
        Select Patron Type:
      </FormLabel>
      <RadioGroup
        row
        aria-label='patron-type'
        name='patron-type'
        value={patronType}
        onChange={(type) => changePatronTypeHandler(type.target.value)}
      >
        <FormControlLabel value='student' control={<Radio />} label='Student' />
        <FormControlLabel value='staff' control={<Radio />} label='Staff' />
        <FormControlLabel value='teacher' control={<Radio />} label='Teacher' />
        <FormControlLabel value='guest' control={<Radio />} label='Guest' />
      </RadioGroup>
    </FormControl>
  )
}

export default SelectPatronType

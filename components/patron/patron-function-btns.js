import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'

import classes from './patron-function-btns.module.css'
import { useRouter } from 'next/router'

function PatronFunctionBtns() {
  const router = useRouter()

  function GetAllBooksHandler() {
    if (router.route == '/catalogs/create') {
      router.push('/catalogs')
    }
  }

  return (
    <div class={classes.btns}>
      <Stack direction='row' spacing={3}>
        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => router.push('/patrons/create')}
        >
          New Patron
        </Button>
        <Button
          variant='outlined'
          onClick={() => router.push('/patrons')}
          startIcon={<FormatListNumberedIcon />}
        >
          Get All books
        </Button>
      </Stack>
    </div>
  )
}

export default PatronFunctionBtns

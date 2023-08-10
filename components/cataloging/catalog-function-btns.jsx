import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'

import classes from './catalog-function-btns.module.css'
import { useRouter } from 'next/router'

function CatalogFunctionBtns() {
  const router = useRouter()

  function CreateRecordHandler() {
    router.push('/catalogs/create')
  }

  function GetAllBooksHandler() {
    if (router.route == '/catalogs/create') {
      router.push('/catalogs')
    }
  }

  return (
    <div className={classes.btns}>
      <Stack direction='row' spacing={3}>
        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={CreateRecordHandler}
        >
          New record
        </Button>
        <Button
          variant='outlined'
          onClick={GetAllBooksHandler}
          startIcon={<FormatListNumberedIcon />}
        >
          Get All books
        </Button>
      </Stack>
    </div>
  )
}

export default CatalogFunctionBtns

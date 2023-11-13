import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

function PatronFunctionBtns(props) {
  return (
    <div className={classes.btns}>
      <Stack direction="row" spacing={3}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => router.push('/patrons/create')}
        >
          New Patron
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/patrons')}
          startIcon={<FormatListNumberedIcon />}
        >
          Get All patrons (Updated)
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportToExcel('quick')}
          startIcon={<FileDownloadIcon />}
        >
          Export As Excel - Quick
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportToExcel('detail')}
          startIcon={<FileDownloadIcon />}
        >
          Export As Excel - Detail
        </Button>
      </Stack>
    </div>
  )
}

export default PatronFunctionBtns

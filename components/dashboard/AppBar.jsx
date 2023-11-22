import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    background: 'white',
    boxShadow: 'none',
    paddingBlock: '10px',
    paddingInline: '25px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function DashboardAppBar(props) {
  const { open, handleDrawerOpen } = props
  return (
    <AppBar
      position="fixed"
      open={open}
      style={{ borderBottom: '3px solid black' }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            color: 'black',
          }}
        >
          <Box>
            <Typography variant="h4" noWrap component="h1">
              Welcome back, IMA
            </Typography>
            <Typography variant="subtitle1" noWrap component="p">
              Managing Dzuels Foundation Activities
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardAppBar

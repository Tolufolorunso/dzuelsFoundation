import Container from '@mui/material/Container'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 270px)`,
      marginLeft: '270px',
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: 'relative',
  },
}))

export default function Content({ children }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  )
}

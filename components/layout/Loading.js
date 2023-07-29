// components/Loading.js
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f4',
  },
  dzuels: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b4070a',
    animation: '$bounce 1s infinite',
  },
  loadingText: {
    marginTop: 8,
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-10px)',
    },
    '60%': {
      transform: 'translateY(-5px)',
    },
  },
}

const Loading = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.dzuels}>
        <span>D</span>
        <span>Z</span>
        <span>U</span>
        <span>E</span>
        <span>L</span>
        <span>S</span>
      </Box>
      <CircularProgress color='primary' sx={styles.loadingText} />
      <Typography variant='body1' sx={styles.loadingText}>
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading

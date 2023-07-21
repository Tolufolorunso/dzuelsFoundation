import Box from '@mui/material/Box'

function Wrapper(props) {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      // height='100vh'
      maxWidth={1200}
      margin='0 auto'
      padding={2}
    >
      {props.children}
    </Box>
  )
}

export default Wrapper

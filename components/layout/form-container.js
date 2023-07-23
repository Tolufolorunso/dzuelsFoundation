import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

function FormContainer(props) {
  const { children } = props
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 550) // Adjust the breakpoint as needed
    }

    // Initial check
    handleResize()

    // Event listener to check when the screen size changes
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box
      maxWidth={750}
      width='100%'
      style={{
        margin: '0 auto 3rem auto',
        backgroundColor: 'rgba(255, 255, 255)',
        borderRadius: '5px',
        padding: isMobile ? '1.5rem 0.7rem' : '2rem 4rem',
      }}
    >
      {children}
    </Box>
  )
}

export default FormContainer

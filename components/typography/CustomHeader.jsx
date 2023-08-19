function CustomHeader({ level, text }) {
  const HeadingTag = `h${level}`

  let styleType
  if (level === 1) {
    styleType = {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    }
  }

  if (level === 2) {
    styleType = {
      fontSize: 'clamp(1rem, 4vw, 2.5rem)',
    }
  }

  if (level === 3) {
    styleType = {
      fontSize: 'clamp(1rem, 3.5vw, 2rem)',
    }
  }

  if (level === 4) {
    styleType = {
      fontSize: 'clamp(1rem, 4vw, 2.5rem)',
    }
  }

  if (level === 5) {
    styleType = {
      fontSize: 'clamp(1rem, 4vw, 2.5rem)',
    }
  }

  styleType = {
    ...styleType,
    fontWeight: 'bold',
    color: 'rgba(45, 45, 45, 0.7)',
    margin: '1rem 0 2.5rem 0',
  }

  return <HeadingTag style={styleType}>{text}</HeadingTag>
}

export default CustomHeader

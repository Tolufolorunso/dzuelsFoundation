export function extractErrorMessages(errors) {
  let messages = []
  for (const key in errors) {
    if (key !== '_message' && errors.hasOwnProperty(key)) {
      const error = errors[key]
      if (error.hasOwnProperty('message')) {
        messages.push(error.message)
        // const { path, ...rest } = error
        // messages.push(rest.message)
      }
    }
  }
  return messages
}

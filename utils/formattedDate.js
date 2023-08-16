export function formatDate(isoDate) {
  const date = new Date(isoDate)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  return formattedDate
}

function calculateExpiryDate(patronExpiryDate = 1) {
  // Get the current date
  const currentDate = new Date()

  // Add one year to the current date
  const expiryDate = new Date(currentDate)
  expiryDate.setFullYear(currentDate.getFullYear() + patronExpiryDate)

  // Return the expiry date
  return expiryDate
}

export default calculateExpiryDate

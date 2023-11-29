import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      // Get the current date
      const currentDate = new Date()
      const currentWeek = getWeek(currentDate)

      // Fetch patrons whose birthday falls within the current week
      const patrons = await Patron.find(
        {
          $expr: {
            $eq: [{ $week: { date: '$dateOfBirth' } }, currentWeek],
          },
          active: true,
        },
        'firstname middlename surname dateOfBirth gender image_url barcode'
      )

      console.log(patrons)

      return res.status(200).json({
        result: patrons.length,
        status: true,
        message: 'Fetched successfully',
        patrons,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  } else {
    return res.status(404).json({ error: 'Route not found' })
  }
}

// Function to get the week of the year from a given date
function getWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return Math.ceil(((date - firstDayOfYear) / millisecondsPerDay + 1) / 7)
}

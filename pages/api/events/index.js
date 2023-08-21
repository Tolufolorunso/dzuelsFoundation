import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect()
    try {
      let { points, date, barcode, eventTitle } = req.body

      points = Number(points)

      const patron = await Patron.findOne({ barcode })

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron not found',
        })
      }
      patron.event.push({
        eventTitle,
        points,
        eventDate: new Date(date),
      })

      patron.points += +points
      await patron.save()

      return res.status(200).json({
        status: true,
        message: `Attendance has been updated. Thank you ${patron.firstname.toLowerCase()} ${patron.surname.toLowerCase()}`,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }
}

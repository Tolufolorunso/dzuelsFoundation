import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  const { method } = req
  if (method === 'POST') {
    await dbConnect()
    try {
      const { patronBarcode, points } = req.body

      if (!patronBarcode || !points) {
        return res
          .status(400)
          .json({ status: false, errorMessage: 'Missing required fields' })
      }

      const patron = await Patron.findOneAndUpdate(
        { barcode: patronBarcode },
        { $inc: { points: points } }, // Increment points by the given value
        { new: true }
      )

      if (!patron) {
        return res
          .status(404)
          .json({ success: false, errorMessage: 'Patron not found' })
      }

      return res.status(200).json({
        status: true,
        message: `${points} added to ${patron.firstname}'s points`,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, errorMessage: 'Error awarding points' })
    }
  }
}

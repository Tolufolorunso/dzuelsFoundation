import dbConnect from '@/lib/dbConnect'
import Cohort from '@/models/CohortModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      const attendance = await Cohort.find().select(
        'firstname surname attendance barcode'
      )
      return res.status(201).json({
        status: true,
        message: 'success',
        attendance,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }
}

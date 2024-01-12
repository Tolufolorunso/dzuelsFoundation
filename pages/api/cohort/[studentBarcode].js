import dbConnect from '@/lib/dbConnect'
import Cohort from '@/models/CohortModel'

export default async function handler(req, res) {
  const { studentBarcode } = req.query

  if (req.method === 'DELETE') {
    try {
      await dbConnect()
      const student = await Cohort.findOne({ barcode: studentBarcode }).select(
        'barcode active firstname surname cohortType'
      )
      if (!student) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Student not found' })
      }

      if (!student.active) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Student not found' })
      }

      student.active = false

      await student.save()
      return res.status(200).json({
        status: true,
        message: `${student.firstname} ${student.surname} has been removed from cohort ${student.cohortType}`,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Something went wrong' })
    }
  }
}

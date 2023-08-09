import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cohort from '@/models/CohortModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()

      const patrons = await Cohort.find().select(
        '-createdAt -updatedAt -_id -__v'
      )

      return res.status(200).json({ status: true, message: 'Fetched', patrons })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      await dbConnect()
      const { barcode } = req.body

      // Check if the patron with the same email already exists
      const patron = await Patron.findOne({ barcode })

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: `Patron with barcode '${barcode}' not found`,
        })
      }

      const isPatronExists = await Cohort.findOne({ barcode })

      if (isPatronExists) {
        return res.status(403).json({
          status: false,
          errorMessage: 'Patron is already added',
        })
      }

      const { firstname, surname, middlename } = patron

      const newCohort = new Cohort({
        barcode,
        firstname,
        surname,
        middlename,
      })

      await newCohort.save()

      return res.status(200).json({
        status: true,
        message: `Patron with barcode ${barcode} Added to Cohort Class successfully`,
      })
    } catch (error) {
      console.error('Error fetching books:', error)
      return res
        .status(500)
        .json({ status: true, errorMessage: 'Something went wrong' })
    }
  }
}

import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      const { patronBarcode } = req.query

      let patron = await Patron.findOne({ barcode: patronBarcode }).select(
        'barcode image_url firstname surname middlename gender address studentSchoolInfo'
      )

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron is not found',
        })
      }

      const patronData = {
        imgUrl: patron.image_url.secure_url,
        fullname: `${patron.firstname} ${patron.middlename} ${patron.surname}`,
        barcode: patron.barcode,
        gender: patron.gender,
        address: `${patron.address.street}`,
        schoolName: `${patron.studentSchoolInfo.schoolName}`,
        currentClass: `${patron.studentSchoolInfo.currentClass}`,
      }

      return res.status(200).json({
        status: true,
        message: 'fetched successfully',
        patron: patronData,
      })
    } catch (error) {
      return res.status(500).json({
        status: false,
        errorMessage: error.message,
      })
    }
  }
}

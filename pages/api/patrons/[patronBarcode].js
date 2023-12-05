import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import { extractErrorMessages } from '@/utils/extractErrorMessage'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // const authorized = await isAuthorized(req)
    // if (authorized) {
    //   return res
    //     .status(401)
    //     .json({ status: false, errorMessage: 'Unauthorized' })
    // }

    const currentDate = new Date()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    try {
      await dbConnect()
      const { patronBarcode } = req.query

      let patron = await Patron.findOne({ barcode: patronBarcode })

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron is not found',
        })
      }

      patron = patron.toObject()
      // Filter the itemsCheckedOutHistory for the specified month and year
      const checkoutHistoryInThisMonth = patron.itemsCheckedOutHistory.filter(
        (item) => {
          const checkoutDate = new Date(item.checkoutDate)
          return (
            checkoutDate.getMonth() === month &&
            checkoutDate.getFullYear() === year
          )
        }
      )

      patron.checkoutHistoryInThisMonth = checkoutHistoryInThisMonth

      return res
        .status(200)
        .json({ status: true, message: 'fetched successfully', patron })
    } catch (error) {
      return res.status(500).json({
        status: false,
        errorMessage: error.message,
      })
    }
  }

  if (req.method === 'PUT') {
    const {
      barcode,
      employerName,
      street,
      city,
      state,
      country,
      schoolName,
      schoolAdress,
      schoolEmail,
      schoolPhoneNumber,
      headOfSchool,
      currentClass,
      parentName,
      parentAddress,
      parentPhoneNumber,
      relationshipToPatron,
      parentEmail,
      patronType,
    } = req.body

    let updatedPatronData = {
      ...req.body,
    }

    if (patronType === 'student') {
      updatedPatronData = {
        ...updatedPatronData,
        address: {
          street,
          city,
          state,
          country,
        },
        studentSchoolInfo: {
          schoolName,
          schoolAdress,
          headOfSchool,
          currentClass,
          schoolEmail,
          schoolPhoneNumber,
        },
        parentInfo: {
          parentName,
          parentAddress,
          parentPhoneNumber,
          relationshipToPatron,
          parentEmail,
        },
      }
    } else if (patronType === 'guest') {
      updatedPatronData = {
        ...updatedPatronData,
      }
    } else {
      updatedPatronData = {
        ...updatedPatronData,
        address: {
          street,
          city,
          state,
          country,
        },
        employerInfo: {
          employerName,
          schoolName,
          schoolAdress,
          headOfSchool,
          schoolEmail,
          schoolPhoneNumber,
        },
      }
    }

    try {
      await dbConnect()

      // Find the patron by barcode
      const existingPatron = await Patron.findOne({ barcode: barcode.trim() })

      if (!existingPatron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron not found',
        })
      }

      // Update the existing patron record with the new data
      const updatedPatron = await Patron.findOneAndUpdate(
        { barcode: barcode.trim() },
        updatedPatronData,
        { new: true }
      )

      return res.status(200).json({
        status: true,
        patron: updatedPatron,
        message: 'Patron updated successfully',
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message, error })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await dbConnect()
      const { patronBarcode } = req.query
      const patron = await Patron.findOneAndDelete({ barcode: patronBarcode })
      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron not found',
        })
      }
      return res.status(200).json({
        status: true,
        message: 'Patron deleted successfully',
      })
    } catch (error) {
      return res.status(500).json({
        status: false,
        errorMessage: error.message,
      })
    }
  }
}

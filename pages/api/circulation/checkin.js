// pages/api/checkout.js
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect()
    const { itemBarcode, patronBarcode } = req.body

    try {
      const patron = await Patron.findOne({ barcode: patronBarcode })
      const cataloging = await Cataloging.findOne({ barcode: itemBarcode })

      if (!cataloging || !patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron or Item not found' })
      }

      // Check if the borrowed book is inside cataloging checkedOutHistory array
      const isPatronBorrowedTheItem = cataloging.checkedOutHistory.find(
        (historyItem) => historyItem.checkedOutBy === patronBarcode
      )

      if (!isPatronBorrowedTheItem) {
        return res.status(409).json({
          status: false,
          errorMessage: 'The patron did not borrow this book',
        })
      }

      // return res.status(200).json({
      //   status: true,
      //   successMessage: 'Checkin Successfully',
      // })

      // Check if the patron has borrowed the book by comparing checkedOutHistory
      const borrowedBook = patron.checkoutHistory.find(
        (historyItem) => historyItem.itemBarcode === itemBarcode
      )

      if (!borrowedBook) {
        return res.status(409).json({
          status: false,
          errorMessage: 'The patron did not borrow this book',
        })
      }

      // Remove the book object from cataloging's checkoutHistory
      cataloging.checkedOutHistory = cataloging.checkedOutHistory.filter(
        (historyItem) => historyItem.checkedOutBy !== patronBarcode
      )

      cataloging.isCheckedOut = false
      patron.hasBorrowedBook = false

      await patron.save()
      await cataloging.save()

      res.status(200).json({
        status: true,
        successMessage: 'Checkin Successfully',
        checkedInData: {},
      })
    } catch (error) {
      res.status(500).json({ status: false, errorMessage: error.message })
    }
  }
}
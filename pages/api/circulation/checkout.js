// pages/api/checkout.js
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      const patron = await Patron.findOne({ barcode: req.query.patronBarcode })

      if (!patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron not found' })
      }

      return res.status(200).json({ status: true, patron })
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
        errorMessage: 'Server error occurred',
      })
    }
  }

  if (req.method == 'POST') {
    try {
      await dbConnect()
      const { patronBarcode, itemBarcode, dueDay = 2 } = req.body
      console.log(patronBarcode, itemBarcode, dueDay)

      // Find the patron and the cataloging record by ID and barcode, respectively
      const cataloging = await Cataloging.findOne({ barcode: itemBarcode })
      const patron = await Patron.findOne({ barcode: patronBarcode })

      if (!cataloging || !patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron or Item not found' })
      }

      console.log(cataloging)

      if (cataloging.isCheckedOut) {
        return res
          .status(409)
          .json({ errorMessage: 'Item is already checked out' })
      }

      // Get the current date and time
      const currentDate = new Date()
      const dueDate = new Date().setDate(currentDate.getDate() + dueDay)

      // Update the cataloging record with checkout details
      cataloging.checkedOutHistory.push({
        checkedOutBy: patronBarcode,
        checkedOutAt: currentDate,
        dueDate: dueDate,
      })
      cataloging.isCheckedOut =
        cataloging.checkedOutHistory.length === cataloging.holdingsInformation
          ? true
          : false
      // Set the due date here based on library policies
      await cataloging.save()

      // Update the patron's checkout history
      patron.checkoutHistory.push({
        itemBarcode: cataloging.barcode,
        checkoutDate: new Date(),
        dueDate: cataloging.checkedOutHistory.dueDate,
      })
      await patron.save()

      console.log(76, cataloging.checkedOutHistory)

      return res.status(200).json({
        status: true,
        message: 'Checkout successful',
        checkedOut: {
          title: cataloging.title.mainTitle,
          itemBarcode: cataloging.barcode,
          dueDate: new Date(dueDate).toDateString(),
        },
      })
    } catch (error) {
      console.error('Error during checkout:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

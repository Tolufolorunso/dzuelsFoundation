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
      const { patronId, barcode } = req.body

      // Find the patron and the cataloging record by ID and barcode, respectively
      const patron = await Patron.findById(patronId)
      const cataloging = await Cataloging.findOne({ barcode })

      if (!patron || !cataloging) {
        return res
          .status(404)
          .json({ errorMessage: 'Patron or item not found' })
      }

      if (cataloging.checkedOutBy) {
        return res
          .status(409)
          .json({ errorMessage: 'Item is already checked out' })
      }

      // Update the cataloging record with checkout details
      cataloging.checkedOutBy = patronId
      cataloging.dueDate = new Date() // Set the due date here based on library policies
      await cataloging.save()

      // Update the patron's checkout history
      patron.checkoutHistory.push({
        itemId: cataloging._id,
        checkoutDate: new Date(),
        dueDate: cataloging.dueDate,
      })
      await patron.save()

      return res.status(200).json({ message: 'Checkout successful' })
    } catch (error) {
      console.error('Error during checkout:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}
// pages/api/renew.js
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect()
      let { patronBarcode, itemBarcode, dueDay = 2 } = req.body
      dueDay = Number(dueDay)

      console.log(patronBarcode, itemBarcode, dueDay)

      // Find the patron and the cataloging record by ID and barcode, respectively
      const cataloging = await Cataloging.findOne({ barcode: itemBarcode })
      const patron = await Patron.findOne({ barcode: patronBarcode })

      if (!cataloging || !patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron or Item not found' })
      }

      // Check if the item is checked out by the patron
      const borrowedBook = patron.checkoutHistory.find(
        (historyItem) => historyItem.itemBarcode === itemBarcode
      )

      if (!borrowedBook) {
        return res.status(409).json({
          status: false,
          errorMessage: 'The patron did not borrow this item',
        })
      }

      // Calculate the new due date for renewal
      const currentDate = new Date()
      const newDueDate = new Date().setDate(currentDate.getDate() + dueDay)

      // Update the cataloging record with the new due date
      const checkoutHistoryEntry = cataloging.checkedOutHistory.find(
        (historyItem) => historyItem.checkedOutBy === patronBarcode
      )
      if (checkoutHistoryEntry) {
        checkoutHistoryEntry.dueDate = newDueDate
      }
      // Set the due date here based on library policies
      await cataloging.save()

      // Update the patron's checkout history with the new due date
      const patronCheckoutEntry = patron.checkoutHistory.find(
        (historyItem) => historyItem.itemBarcode === itemBarcode
      )
      if (patronCheckoutEntry) {
        patronCheckoutEntry.dueDate = newDueDate
      }
      await patron.save()

      return res.status(200).json({
        status: true,
        message: 'Renewal successful',
        renewed: {
          title: cataloging.title.mainTitle,
          itemBarcode: cataloging.barcode,
          newDueDate: new Date(newDueDate).toDateString(),
        },
      })
    } catch (error) {
      console.error('Error during renewal:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

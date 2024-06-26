// pages/api/checkout.js
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cataloging from '@/models/CatalogingModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  // const session = await getServerSession(req, res, authOptions)
  // if (!session) {
  //   return res.status(401).json({
  //     status: false,
  //     errorMessage: 'You are not allowed to access this routes',
  //   })
  // }

  if (req.method === 'POST') {
    await dbConnect()
    let { itemBarcode, patronBarcode, isPatronRead, point } = req.body

    point = Number(point)

    try {
      const patron = await Patron.findOne({ barcode: patronBarcode })
      const cataloging = await Cataloging.findOne({ barcode: itemBarcode })

      if (!cataloging || !patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron or Item not found' })
      }

      // Check if the borrowed book is inside cataloging checkedOutHistory array
      const isPatronBorrowedTheItem = cataloging.patronsCheckedOutHistory.find(
        (historyItem) =>
          historyItem.checkedOutBy.toString() === patron._id.toString()
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
      const borrowedBook = patron.itemsCheckedOutHistory.find(
        (historyItem) =>
          historyItem.itemId.toString() === cataloging._id.toString()
      )

      if (!borrowedBook) {
        return res.status(409).json({
          status: false,
          errorMessage: 'The patron did not borrow this book',
        })
      }
      // Check if the book is checked in on or before the due date
      // const currentDate = new Date()
      // const dueDate = new Date(isPatronBorrowedTheItem.dueDate)

      // if (currentDate <= dueDate) {
      //   // Award a point to the patron if checked in on or before the due date
      //   patron.points += 1
      // }

      // Remove the book object from cataloging's checkoutHistory
      cataloging.patronsCheckedOutHistory =
        cataloging.patronsCheckedOutHistory.filter((historyItem) => {
          return historyItem.checkedOutBy.toString() !== patron._id.toString()
          // return historyItem.checkedOutBy !== patronBarcode
        })

      // I will do it later, on monday
      if (isPatronRead.toLowerCase() === 'no') {
        // Remove the book from the patron's itemsCheckedOutHistory
        patron.itemsCheckedOutHistory = patron.itemsCheckedOutHistory.filter(
          (item) => item.itemId.toString() !== cataloging._id.toString()
        )
      }

      const DEFAULT_POINT = 1

      patron.points =
        point >= 1 ? patron.points + point : patron.points + DEFAULT_POINT

      cataloging.isCheckedOut = false
      patron.hasBorrowedBook = false

      await patron.save()
      await cataloging.save()

      res.status(200).json({
        status: true,
        successMessage: `Checkin Successfully${
          isPatronRead.toLowerCase() === 'no' ? ', Book Not read' : ''
        }`,
        checkedInData: {},
      })
    } catch (error) {
      res.status(500).json({ status: false, errorMessage: error.message })
    }
  }
}

// pages/api/checkout.js
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cataloging from '@/models/CatalogingModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

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

      // Find the patron and the cataloging record by ID and barcode, respectively
      const cataloging = await Cataloging.findOne({ barcode: itemBarcode })
      const patron = await Patron.findOne({ barcode: patronBarcode })

      if (patron?.image_url && !patron?.image_url?.public_id) {
        return res.status(403).json({
          status: false,
          errorMessage: 'You have not taken your passport photography',
        })
      }

      if (!patron) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Patron not found' })
      }

      if (!cataloging) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Item not found' })
      }

      if (patron.hasBorrowedBook) {
        return res.status(409).json({
          errorMessage:
            'You are not allowed to borrow more than one item at a time',
        })
      }

      // if (
      //   patron.itemsCheckedOutHistory.some(
      //     (item) => item.itemBarcode === cataloging.barcode
      //   )
      // ) {
      //   return res.status(409).json({
      //     errorMessage: 'You have already borrowed this item before',
      //   })
      // }

      if (cataloging.isCheckedOut) {
        return res
          .status(409)
          .json({ errorMessage: 'Item is/are already checked out' })
      }

      // Get the current date and time
      const currentDate = new Date()
      const dueDate = new Date().setDate(currentDate.getDate() + dueDay)

      // Update the cataloging record with checkout details
      // cataloging.checkedOutHistory.push({
      //   checkedOutBy: patron._id,
      //   checkedOutAt: currentDate,
      //   dueDate: dueDate,
      // })

      cataloging.patronsCheckedOutHistory.push({
        checkedOutBy: patron._id,
        checkedOutAt: currentDate,
        dueDate: dueDate,
        fullname: `${patron.surname}, ${patron.firstname} ${patron.middlename}`,
        contactNumber:
          patron.phoneNumber ||
          patron.parentInfo.parentPhoneNumber ||
          'No Phone Number',
        barcode: patron.barcode,
      })

      // cataloging.isCheckedOut =
      //   cataloging.checkedOutHistory.length === cataloging.holdingsInformation
      //     ? true
      //     : false

      cataloging.isCheckedOut = true
      // Set the due date here based on library policies
      await cataloging.save()

      // Update the patron's checkout history
      // patron.checkoutHistory.push({
      //   itemId: cataloging._id,
      //   checkoutDate: new Date(),
      //   dueDate: dueDate,
      // })

      if (
        !patron.itemsCheckedOutHistory.some(
          (item) => item.itemBarcode === cataloging.barcode
        )
      ) {
        patron.itemsCheckedOutHistory.push({
          itemId: cataloging._id,
          checkoutDate: currentDate,
          dueDate: dueDate,
          itemTitle: cataloging.title.mainTitle,
          itemSubTitle: cataloging.title.subtitle,
          itemBarcode: cataloging.barcode,
          eventTitle: 'reading competition',
          event: true,
        })
      }

      patron.hasBorrowedBook = true
      await patron.save()

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

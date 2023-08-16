import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()

      const checkoutHistory = await Cataloging.find({
        'checkedOutHistory.0': { $exists: true },
      }).populate({
        path: 'checkedOutHistory.checkedOutBy',
        select: 'barcode firstname surname',
      })

      console.log(17, checkoutHistory[0])
      const formattedHistory = checkoutHistory
        .map((item) => {
          return item.checkedOutHistory.map((checkout) => ({
            patronBarcode: checkout.checkedOutBy.barcode,
            title: item.title.mainTitle,
            patronName: `${checkout.checkedOutBy.firstname} ${checkout.checkedOutBy.surname}`,
            borrowingDate: checkout.checkedOutAt,
            dueDate: checkout.dueDate,
          }))
        })
        .flat()

      console.log(27, formattedHistory)

      return res
        .status(200)
        .json({ status: true, message: 'Fetched', holds: formattedHistory })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }
}

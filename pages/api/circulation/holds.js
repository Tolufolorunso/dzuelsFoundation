import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      // const checkoutHistory = await Cataloging.find({
      //   'checkedOutHistory.0': { $exists: true },
      // }).populate({
      //   path: 'checkedOutHistory.checkedOutBy',
      //   select: 'barcode firstname surname',
      // })

      // const checkoutHistory = await Cataloging.find({
      //   'patronsCheckedOutHistory.0': { $exists: true },
      // })

      const checkoutHistory = await Cataloging.find({
        'patronsCheckedOutHistory.0': { $exists: true },
      }).populate({
        path: 'patronsCheckedOutHistory.checkedOutBy',
        select: 'barcode firstname surname',
      })

      // const formattedHistory = checkoutHistory
      //   .map((item) => {
      //     return item.checkedOutHistory.map((checkout) => ({
      //       patronBarcode: checkout.checkedOutBy.barcode,
      //       itemBarcode: item.barcode,
      //       title: item.title.mainTitle,
      //       patronName: `${checkout.checkedOutBy.firstname} ${checkout.checkedOutBy.surname}`,
      //       borrowingDate: checkout.checkedOutAt,
      //       dueDate: checkout.dueDate,
      //     }))
      //   })
      //   .flat()

      const formattedHistory = checkoutHistory
        .map((item) => {
          return item.patronsCheckedOutHistory.map((patron) => ({
            patronBarcode: patron.barcode,
            itemBarcode: item.barcode,
            title: item.title.mainTitle,
            subtitle: item.title.subtitle,
            patronName: patron.fullname,
            borrowingDate: patron.checkedOutAt,
            dueDate: patron.dueDate,
          }))
        })
        .flat()


      return res
        .status(200)
        .json({ status: true, message: 'Fetched', holds: formattedHistory })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }
}

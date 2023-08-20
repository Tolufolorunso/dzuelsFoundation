import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()

      const currentDate = new Date()

      const overdueItems = await Cataloging.find({
        'checkedOutHistory.dueDate': { $lte: currentDate },
      }).populate({
        path: 'checkedOutHistory.checkedOutBy',
        select: 'barcode firstname surname',
      })

      console.log('overdue server')
      const formattedOverdueItems = overdueItems.map((item) => ({
        title: item.title.mainTitle,
        itemBarcode: item.barcode,
        patronBarcode: item.checkedOutHistory[0].checkedOutBy.barcode,
        patronName: `${item.checkedOutHistory[0].checkedOutBy.firstname} ${item.checkedOutHistory[0].checkedOutBy.surname}`,
        dueDate: item.checkedOutHistory[0].dueDate,
      }))

      console.log(formattedOverdueItems)

      return res.status(200).json({
        status: true,
        message: 'Fetched',
        overdueItems: formattedOverdueItems,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }
}

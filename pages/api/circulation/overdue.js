// import dbConnect from '@/lib/dbConnect'
// import Cataloging from '@/models/CatalogingModel'

// export default async function handler(req, res) {
//   await dbConnect()
//   if (req.method === 'GET') {
//     try {
//       const currentDate = new Date()

//       const overdueItems = await Cataloging.find({
//         'checkedOutHistory.dueDate': { $lte: currentDate },
//       }).populate({
//         path: 'checkedOutHistory.checkedOutBy',
//         select: 'barcode firstname surname',
//       })

//       const formattedOverdueItems = overdueItems.map((item) => ({
//         title: item.title.mainTitle,
//         itemBarcode: item.barcode,
//         patronBarcode: item.checkedOutHistory[0].checkedOutBy.barcode,
//         patronName: `${item.checkedOutHistory[0].checkedOutBy.firstname} ${item.checkedOutHistory[0].checkedOutBy.surname}`,
//         dueDate: item.checkedOutHistory[0].dueDate,
//       }))

//       return res.status(200).json({
//         status: true,
//         message: 'Fetched',
//         overdueItems: formattedOverdueItems,
//       })
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ status: false, errorMessage: error.message })
//     }
//   }
// }

import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await dbConnect()
      const currentDate = new Date()

      const overdueItems = await Cataloging.find({
        'checkedOutHistory.dueDate': { $lte: currentDate },
      }).populate({
        path: 'checkedOutHistory.checkedOutBy',
        select: 'barcode firstname surname',
      })

      const formattedOverdueItems = overdueItems.map((item) => {
        const firstCheckedOut = item.checkedOutHistory[0]
        return {
          title: item.title?.mainTitle || 'Unknown Title',
          itemBarcode: item.barcode || 'Unknown Barcode',
          patronBarcode:
            firstCheckedOut?.checkedOutBy?.barcode || 'Unknown Patron Barcode',
          patronName: `${
            firstCheckedOut?.checkedOutBy?.firstname || 'Unknown'
          } ${firstCheckedOut?.checkedOutBy?.surname || 'Patron'}`,
          dueDate: firstCheckedOut?.dueDate || 'Unknown Due Date',
        }
      })

      return res.status(200).json({
        status: true,
        message: 'Fetched',
        overdueItems: formattedOverdueItems,
      })
    } else {
      return res
        .status(405)
        .json({ status: false, errorMessage: 'Method Not Allowed' })
    }
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ status: false, errorMessage: 'Internal Server Error' })
  }
}

import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'

export default async function handler(req, res) {
  const { itemBarcode } = req.query

  if (req.method === 'GET') {
    try {
      await dbConnect()
      const item = await Cataloging.findOne({ barcode: itemBarcode })

      if (!item) {
        return res
          .status(404)
          .json({ status: false, message: 'Item not found' })
      }

      return res.status(200).json({ status: true, message: 'Item found', item })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Something went wrong' })
    }
  }

  if (req.method == 'PUT') {
    try {
      await dbConnect()
      const { itemBarcode } = req.query
      const item = await Cataloging.findOne({ barcode: itemBarcode })

      if (!item) {
        return res
          .status(404)
          .json({ status: false, message: 'Item not found' })
      }

      const indexTermGenre = req.body.indexTermGenre.split(', ')

      const data = {
        ...req.body,
        title: { mainTitle: req.body.title, subtitle: req.body.subtitle },
        author: {
          mainAuthor: req.body.mainAuthor,
          additionalAuthors: req.body.additionalAuthors,
        },
        publicationInfo: {
          publisher: req.body.publisher,
          place: req.body.place,
          year: req.body.year,
        },
        indexTermGenre: indexTermGenre,
      }

      const catalogItem = await Cataloging.findOneAndUpdate(
        { barcode: itemBarcode },
        data,
        { new: true, runValidators: true }
      )

      return res.status(200).json({
        status: true,
        message: 'Item updated successfully',
        item: catalogItem,
      })
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

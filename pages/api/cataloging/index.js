import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'

async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      await dbConnect()

      const barcode = req.body.barcode.trim()
      const controlNumber = req.body.controlNumber.trim()
      const title = req.body.title.trim()

      if (!barcode || !controlNumber || !title) {
        return res.status(400).json({
          status: false,
          errorMessage: 'All fields with asterics are required.',
        })
      }

      // Check if the barcode already exists in the database
      const existingBook = await Cataloging.findOne({
        $or: [{ controlNumber }, { barcode }],
      })

      if (existingBook) {
        return res.status(409).json({
          status: false,
          errorMessage: 'Barcode or control number already exists',
        })
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

      // If data is valid, create a new book record in the database
      const newBook = await Cataloging.create(data)

      return res.status(201).json({
        status: true,
        message: `Book added successfully. Book Name: ${newBook.title.mainTitle}, ControlNumber: ${newBook.controlNumber}`,
        data: { barcode: newBook.barcode, title: newBook.title.mainTitle },
      })
    } catch (error) {
      console.error('Error adding book:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }

  if (req.method == 'GET') {
    try {
      await dbConnect()
      const { title, author, publisher, barcode, ISBN, library } = req.query

      // Build the query object based on the provided filters
      const query = {}
      if (title) query.title = new RegExp(title, 'i') // Case-insensitive search
      if (author) query.author = new RegExp(author, 'i')
      if (library) query.library = new RegExp(library, 'i')
      if (publisher)
        query['publicationInfo.publisher'] = new RegExp(publisher, 'i')
      if (barcode) query.barcode = barcode
      if (ISBN) query.ISBN = ISBN

      // Fetch cataloging records based on the query
      const catalogingRecords = await Cataloging.find(query).select(
        'barcode author title classification controlNumber isCheckedOut'
      )

      return res.status(200).json({ status: true, items: catalogingRecords })
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

export default handler

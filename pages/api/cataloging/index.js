import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/CatalogingModel'
import Joi from 'joi'

async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      await dbConnect()

      // Check if the barcode already exists in the database
      const existingBookWithBarcode = await Cataloging.findOne({
        barcode: req.body.barcode,
      })

      if (existingBookWithBarcode) {
        return res.status(409).json({ error: 'Barcode already in use' })
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
        message: 'Book added successfully',
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
        'barcode author title classification controlNumber'
      )

      return res.status(200).json(catalogingRecords)
    } catch (error) {
      console.error('Error fetching books:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

export default handler

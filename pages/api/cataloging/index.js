import dbConnect from '@/lib/dbConnect'
import Cataloging from '@/models/Cataloging'
import Joi from 'joi'

async function handler(req, res) {
  console.log(6, req.body)

  if (req.method == 'POST') {
    try {
      // Define a Joi schema for validation
      // const schema = Joi.object({
      //   title: Joi.object().required(),
      //   author: Joi.object().required(),
      //   publicationInfo: Joi.object({
      //     publisher: Joi.string().required(),
      //     place: Joi.string().required(),
      //     year: Joi.number().required(),
      //   }).required(),
      //   ISBN: Joi.string().required(),
      //   physicalDescription: Joi.string(),
      //   barcode: Joi.string().required(),
      //   subjectHeadings: Joi.array().items(Joi.string()),
      // })

      // Validate the request body against the schema
      // const { error } = schema.validate(req.body)
      // console.log(29, error)

      // if (error) {
      //   return res.status(400).json({ error: error.details[0].message })
      // }

      await dbConnect()

      // Check if the barcode already exists in the database
      const existingBookWithBarcode = await Cataloging.findOne({
        barcode: req.body.barcode,
      })

      console.log(existingBookWithBarcode)

      if (existingBookWithBarcode) {
        return res.status(409).json({ error: 'Barcode already in use' })
      }

      const subHeading = req.body.subjectHeadings.split(', ')

      const data = {
        ...req.body,
        title: { mainTitle: req.body.title, subtitle: req.body.subtitle },
        author: {
          mainAuthor: req.body.mainAuthor,
          additionalAuthor: req.body.additionalAuthor,
        },
        publicationInfo: {
          publisher: req.body.publisher,
          place: req.body.place,
          year: req.body.year,
        },
        subjectHeadings: subHeading,
      }

      console.log(data)

      // If data is valid, create a new book record in the database
      const newBook = await Cataloging.create(data)

      return res.status(201).json(newBook)
    } catch (error) {
      console.error('Error adding book:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

export default handler

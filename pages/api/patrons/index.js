// pages/api/addPatron.js
import Joi from 'joi'

import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import calculateExpiryDate from '@/utils/expiryDate'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  try {
    await dbConnect() // Connect to the MongoDB database

    // Check if the patron with the same email already exists
    const existingPatron = await Patron.findOne({ barcode: req.body.barcode })
    if (existingPatron) {
      return res
        .status(409)
        .json({ error: 'Duplicate patron, check the barcode' })
    }

    let patronExpiryDate

    if (req.body.patronType === 'staff') {
      patronExpiryDate = calculateExpiryDate(5)
    } else {
      patronExpiryDate = calculateExpiryDate()
    }

    const patronData = {
      ...req.body,
      patronExpiryDate,
      libraryManagment: {},
    }

    // Create a new patron record
    const newPatron = await Patron.create(patronData)

    return res.status(201).json({ status: true, patron: newPatron })
  } catch (error) {
    console.error('Error adding patron:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

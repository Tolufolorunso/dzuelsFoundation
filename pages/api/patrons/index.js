// pages/api/addPatron.js
import Joi from 'joi'

import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import calculateExpiryDate from '@/utils/expiryDate'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }
  const {
    barcode,
    employerName,
    street,
    city,
    state,
    country,
    schoolName,
    schoolAdress,
    schoolEmail,
    schoolPhoneNumber,
    headOfSchool,
    currentClass,
    parentName,
    parentAddress,
    parentPhoneNumber,
    relationshipToPatron,
    parentEmail,
    patronType,
    messagePreferences,
  } = req.body

  let patronExpiryDate

  if (patronType === 'staff') {
    patronExpiryDate = calculateExpiryDate(5)
  } else {
    patronExpiryDate = calculateExpiryDate()
  }

  let patronData = {
    ...req.body,
    patronExpiryDate,
    messagePreferences: messagePreferences
      ? messagePreferences.split(', ')
      : [],
  }

  if (patronType === 'student') {
    patronData = {
      ...patronData,
      address: {
        street,
        city,
        state,
        country,
      },
      studentSchoolInfo: {
        schoolName,
        schoolAdress,
        headOfSchool,
        currentClass,
        schoolEmail,
        schoolPhoneNumber,
      },
      parentInfo: {
        parentName,
        parentAddress,
        parentPhoneNumber,
        relationshipToPatron,
        parentEmail,
      },
    }
  } else if (patronType === 'guest') {
    patronData = {
      ...patronData,
    }
  } else {
    patronData = {
      ...patronData,
      address: {
        street,
        city,
        state,
        country,
      },
      employerInfo: {
        employerName,
        schoolName,
        schoolAdress,
        headOfSchool,
        schoolEmail,
        schoolPhoneNumber,
      },
    }
  }

  try {
    await dbConnect()

    // Check if the patron with the same email already exists
    const existingPatron = await Patron.findOne({ barcode })
    if (existingPatron) {
      return res.status(409).json({
        status: false,
        errorMessage: 'Duplicate patron, check the barcode',
      })
    }

    // Create a new patron record
    const newPatron = await Patron.create(patronData)

    return res.status(201).json({
      status: true,
      patron: newPatron,
      message: 'Patron created successfully',
    })
  } catch (error) {
    // Get the error messages as an array
    const errorMessagesArray = extractErrorMessages(error.errors)
    const errorMessageString = errorMessagesArray.join('\n')
    return res
      .status(500)
      .json({ status: false, errorMessage: errorMessageString, error })
  }
}

function extractErrorMessages(errors) {
  let messages = []
  for (const key in errors) {
    if (key !== '_message' && errors.hasOwnProperty(key)) {
      const error = errors[key]
      if (error.hasOwnProperty('message')) {
        messages.push(error.message)
        // const { path, ...rest } = error
        // messages.push(rest.message)
      }
    }
  }
  return messages
}

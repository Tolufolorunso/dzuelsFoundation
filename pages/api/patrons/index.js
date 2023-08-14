import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import calculateExpiryDate from '@/utils/expiryDate'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      let { firstname, surname, library, barcode, gender, patronType, mode } =
        req.query

      // Build the query object based on the provided filters
      const query = {}
      if (firstname) query.firstname = new RegExp(firstname, 'i') // Case-insensitive search
      if (surname) query.surname = new RegExp(surname, 'i')
      if (library) query.library = new RegExp(library, 'i')
      if (gender) query.gender = new RegExp(gender, 'i')
      if (patronType) query.patronType = new RegExp(patronType, 'i')
      if (barcode) query.barcode = barcode

      if (mode === 'detail') {
        const patrons = await Patron.find(query).select(
          '-_id -checkoutHistory -createdAt'
        )
        return res.status(200).json({ status: true, patrons })
      }

      // Fetch cataloging records based on the query
      const patrons = await Patron.find(query).select(
        'firstname surname library barcode gender patronType phoneNumber'
      )

      console.log(patrons)

      return res.status(200).json({ status: true, patrons })
    } catch (error) {
      console.error('Error fetching books:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }

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
    const existingPatron = await Patron.findOne({ barcode: barcode.trim() })

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

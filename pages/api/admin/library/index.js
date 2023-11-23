import dbConnect from '@/lib/dbConnect'
import Library from '@/models/Library'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect()
      let { libraryName, city, country, zipCode, state, street } = req.body

      if (!libraryName || !city || !country || !zipCode || !state || !street) {
        return res
          .status(400)
          .json({ status: false, errorMessage: 'All fields are required' })
      }

      libraryName = libraryName.toLowerCase().trim()

      // Check if the library already exists
      const existingLibrary = await Library.findOne({ libraryName })

      if (existingLibrary) {
        return res
          .status(400)
          .json({ status: false, errorMessage: 'Library already exists' })
      }

      // Create a new Library instance
      const newLibrary = new Library({
        libraryName,
        address: {
          street,
          city,
          country,
          zipCode,
          state,
        },
      })
      await newLibrary.save()

      return res.status(200).json({
        status: true,
        message: 'Library created successfully',
        library: newLibrary,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }

  if (req.method === 'GET') {
    try {
      const { libraryName } = req.query
      // Find the library by name
      const library = await Library.findOne({ libraryName })
      if (!library) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Library not found' })
      }

      return res.status(200).json({ status: true, library })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }
}

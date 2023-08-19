import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body)
      return res.status(201).json({
        status: true,
        message: 'success',
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }
}

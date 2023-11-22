import dbConnect from '@/lib/dbConnect'
import Library from '@/models/Library'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      return res
        .status(200)
        .json({ status: true, message: 'Fetch', library: {} })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }
}

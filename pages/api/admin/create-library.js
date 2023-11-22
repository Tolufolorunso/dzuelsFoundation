import dbConnect from '@/lib/dbConnect'
import Library from '@/models/Library'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      return res
        .status(200)
        .json({ status: true, message: 'Fetch', library: 'hello' })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: 'Internal server error' })
    }
  }
}

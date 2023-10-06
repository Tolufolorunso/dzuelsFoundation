import cloudinary from 'cloudinary'
import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import { v2 as cloudinaryV2 } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect()
      const { barcode, photoData } = req.body

      const patron = await Patron.findOne({ barcode }).select(
        'patronType firstname barcode image_url'
      )

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron is not found',
        })
      }

      const result = await cloudinaryV2.uploader.upload(photoData, {
        folder: 'dzuels',
        public_id: `${patron.patronType}_${patron.firstname}_barcode_${patron.barcode}`,
        faces: true,
      })

      patron.image_url = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      }

      await patron.save()
      return res.status(200).json({
        status: true,
        message: 'Image uploaded successfully',
        patronBarcode: barcode,
        imageUrl: result.secure_url,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        status: false,
        errorMessage: 'Internal Server Error',
      })
    }
  }
}

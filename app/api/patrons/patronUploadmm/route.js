import { NextResponse } from 'next/server'
import cloudinary from 'cloudinary'
import { v2 as cloudinaryV2 } from 'cloudinary'
import Patron from '@/models/PatronModel'
import dbConnect from '@/lib/dbConnect'

// Configure Cloudinary (uncomment and replace with your credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  try {
    await dbConnect()
    const reqBody = await req.json()
    let { barcode, photoData } = reqBody

    if (!barcode || !photoData) {
      return NextResponse.json(
        {
          status: false,
          errorMessage: 'Image is not supplied.',
        },
        { status: 400 }
      )
    }

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
      crop: 'fill',
      quality: 'auto',
    })

    patron.image_url = {
      secure_url: result.secure_url,
      public_id: result.public_id,
    }

    await patron.save()

    return NextResponse.json(
      {
        status: true,
        message: 'Image uploaded successfully',
        patronBarcode: barcode,
        imageUrl: result.secure_url,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { status: false, errorMessage: error.message },
      { status: 500 }
    )
  }
}

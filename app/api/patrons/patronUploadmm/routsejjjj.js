import cloudinary from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// cloudinary.config({
//   cloud_name: 'YOUR_CLOUD_NAME',
//   api_key: 'YOUR_API_KEY',
//   api_secret: 'YOUR_API_SECRET',
// });

export default async function Post(request) {
  if (req.method === 'POST') {
    const formData = await request.formData()

    return NextResponse.json(
      {
        status: false,
        errorMessage: 'Please provide all fields!!!',
      },
      { status: 400 }
    )

    try {
      // Use multer to parse the form data and handle file upload
      upload.single('imageFile')(req, res, async function (err) {
        if (err) {
          return res.status(400).json({
            status: false,
            message: 'File upload failed',
          })
        }

        // Access the form data fields
        const patronBarcode = req.body.patronBarcode

        // Access the uploaded file
        const file = req.file

        // Check if Cloudinary is configured
        // if (!cloudinary.config().cloud_name) {
        //   console.error(
        //     'Cloudinary not configured. Please provide your credentials.'
        //   )
        //   return res.status(500).json({
        //     status: false,
        //     message: 'Internal server error',
        //   })
        // }

        // Upload the file to Cloudinary
        // const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        //   file.path,
        //   {
        //     folder: 'your-upload-folder', // Replace with your desired folder
        //   }
        // )

        return res.status(200).json({
          status: true,
          message: 'Image uploaded successfully',
          // patronBarcode: patronBarcode,
          // uploadedFile: file.originalname,
          // cloudinaryResponse: cloudinaryResponse,
        })
      })
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
      })
    }
  }
}

// "next": "13.4.10",

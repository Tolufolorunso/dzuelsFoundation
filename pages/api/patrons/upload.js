import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err)
      res.status(500).json({ error: 'File upload failed.' })
      return
    }

    const file = files.file
    const tempFilePath = file.path

    // Check if the uploaded file is of Excel type.
    const extName = path.extname(file.name)
    if (extName !== '.xlsx') {
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err)
        } else {
          console.log('Temporary file deleted successfully.')
        }
      })

      res.status(400).json({ error: 'Please upload a valid Excel file.' })
      return
    }

    // Read the Excel file as binary data.
    fs.readFile(tempFilePath, (err, data) => {
      if (err) {
        console.error('Error reading the Excel file:', err)
        res.status(500).json({ error: 'Error reading the Excel file.' })
        return
      }

      // Convert the binary data to a workbook and extract the data.
      try {
        const workbook = xlsx.read(data, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const extractedData = xlsx.utils.sheet_to_json(worksheet)
        // const
        // console.log(extractedData)

        // Now you have the 'extractedData' variable containing the extracted data.
        // console.log('Data extracted:', extractedData)

        // Delete the temporary file after extracting the data.
        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err)
          } else {
            console.log('Temporary file deleted successfully.')
          }
        })

        res.status(200).json({ data: extractedData })
      } catch (error) {
        console.error('Error extracting data from the Excel file:', error)
        res
          .status(500)
          .json({ error: 'Error extracting data from the Excel file.' })
      }
    })
  })
}

// const post = async (req, res) => {
//   console.log(123)
//   const form = new formidable.IncomingForm()
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form:', err)
//       res.status(500).json({ error: 'File upload failed.' })
//       return
//     }

//     const file = files.file
//     const tempFilePath = file.path

//     const extName = path.extname(file.name)

//     console.log(extName)

//     // You can handle the file in any way you want here. For example, you can move it to a specific folder.
//     // In this example, we'll simply remove the temporary file.
//     if (extName !== '.xlsx') {
//       fs.unlink(tempFilePath, async (err) => {
//         if (err) {
//           console.error('Error deleting temporary file:', err)
//         } else {
//           console.log('Temporary file deleted successfully.')
//         }
//       })
//       res.status(200).json({ message: 'File uploaded successfully.' })
//     }
//   })
// }

const saveFile = async (file) => {
  console.log(file)
  const data = fs.readFileSync(file.path)
  console.log(data)
  fs.writeFileSync(`./public/${file.name}`, data)
  await fs.unlinkSync(file.path)
  return
}

// export default post

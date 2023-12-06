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
          // err
        } else {
          // success
        }
      })

      res.status(400).json({ error: 'Please upload a valid Excel file.' })
      return
    }

    // Read the Excel file as binary data.
    fs.readFile(tempFilePath, (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error reading the Excel file.' })
        return
      }

      // Convert the binary data to a workbook and extract the data.
      try {
        const workbook = xlsx.read(data, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const extractedData = xlsx.utils.sheet_to_json(worksheet)

        // Delete the temporary file after extracting the data.
        fs.unlink(tempFilePath, (err) => {
          if (err) {
            /// err
          } else {
            // success
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

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path)
  fs.writeFileSync(`./public/${file.name}`, data)
  await fs.unlinkSync(file.path)
  return
}

// export default post

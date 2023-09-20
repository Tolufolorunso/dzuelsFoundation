import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect()
            const { patronBarcode } = req.query;
            const patron = await Patron.findOne({ barcode: patronBarcode });

            if (!patron) {
                return res.status(404).json({
                    status: false,
                    errorMessage: 'Patron is not found',
                })
            }

            return res.status(200).json({ status: true, message: 'fetched successfully', patron });

        } catch (error) {
            return res.status(500).json({
                status: false,
                errorMessage: error.message,
            })
        }
    }
}


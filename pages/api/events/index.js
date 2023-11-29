import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect()
    try {
      let { points, date, barcode, eventTitle } = req.body

      points = Number(points)

      const patron = await Patron.findOne({ barcode })

      if (!patron) {
        return res.status(404).json({
          status: false,
          errorMessage: 'Patron not found',
        })
      }

      const existingEvent = patron.event.find(
        (event) =>
          event.eventDate.toISOString() === new Date(date).toISOString()
      )
      if (existingEvent) {
        return res.status(400).json({
          status: false,
          errorMessage: 'Event already exists for this date',
        })
      }

      patron.event.push({
        eventTitle,
        points,
        eventDate: new Date(date),
      })

      patron.points += points
      await patron.save()

      return res.status(200).json({
        status: true,
        message: `Attendance has been updated. Thank you ${patron.firstname.toLowerCase()} ${patron.surname.toLowerCase()}`,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }

  if (req.method === 'GET') {
    await dbConnect()
    try {
      let { eventTitle } = req.query
      eventTitle = eventTitle.replace(/_/g, ' ')

      const patrons = await Patron.find(
        {},
        'firstname middlename surname points barcode itemsCheckedOutHistory'
      )

      // Filter patrons based on itemsCheckedOutHistory meeting the criteria
      const filteredPatrons = patrons.reduce((filtered, patron) => {
        const filteredItems = patron.itemsCheckedOutHistory.filter(
          (item) => item.event === true && item.eventTitle === eventTitle
        )

        if (filteredItems.length > 0) {
          const fullname = `${patron.surname}, ${patron.firstname} ${patron.middlename}`
          filtered.push({
            fullname: fullname.toUpperCase(),
            points: patron.points,
            barcode: patron.barcode,
            itemsCheckedOutHistory: filteredItems,
            numberOfItems: filteredItems.length,
          })
        }

        return filtered
      }, [])

      if (filteredPatrons.length === 0) {
        return res
          .status(400)
          .json({ status: false, errorMessage: 'No Competition Found' })
      }

      return res.status(200).json({
        status: true,
        message: 'Fetched successfully',
        patrons: filteredPatrons,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, errorMessage: error.message })
    }
  }
}

import dbConnect from '@/lib/dbConnect'
import Patron from '@/models/PatronModel'
import Cohort from '@/models/CohortModel'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect()
      const { date, attendanceStatus, barcode, week } = req.body

      const student = await Cohort.findOne({ barcode })

      if (!student) {
        return res
          .status(404)
          .json({ status: false, errorMessage: 'Student not found' })
      }

      const existingAttendance = student.attendance.find(
        (record) => record.date.toISOString() === new Date(date).toISOString()
      )

      const existingAttendance4Week = student.attendance.find(
        (record) => record.week === week
      )

      if (existingAttendance4Week) {
        return res.status(400).json({
          status: false,
          errorMessage: 'Attendance already marked for the given week',
        })
      }
      if (!existingAttendance) {
        if (attendanceStatus === 'attend') {
          student.attendance.push({ date, week, attended: true })
        } else {
          student.attendance.push({ date, week, attended: false })
        }
        await student.save()

        return res.status(200).json({
          status: true,
          message: 'Attendance marked successfully',
        })
      } else {
        return res.status(400).json({
          status: false,
          errorMessage: 'Attendance already marked for the given date',
        })
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      res.status(500).json({ status: false, errorMessage: error.message })
    }
  }
}

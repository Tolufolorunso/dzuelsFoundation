const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    lowercase: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventExpiredDate: {
    type: Date,
    required: true,
  },
  eventDetails: {
    description: String,
    location: String,
  },
})

export default mongoose.models.Event || mongoose.model('Event', EventSchema)

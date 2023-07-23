// models/PatronModel.js
const mongoose = require('mongoose')

const PatronSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    middleName: String,
    email: {
      type: String,
      lowercase: true,
    },
    phoneNumber: String,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    patronType: {
      type: String,
      enum: ['student', 'teacher', 'staff'],
      default: 'student',
    },
    barcode: {
      type: String,
      unique: true,
    },
    registeredDate: {
      type: Date,
      default: Date.now,
    },
    library: {
      type: String,
      required: true,
    },
    patronExpiryDate: {
      type: Date,
      default: Date.now,
    },
    messagePreferences: {
      type: Array,
      default: ['email', 'text'],
    },
    registeredBy: {
      type: String,
      required: true,
      default: 'Admin',
    },
  },
  { timestamps: true }
)

export default mongoose.models.Patron || mongoose.model('Patron', PatronSchema)

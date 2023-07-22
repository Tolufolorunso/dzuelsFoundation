// models/PatronModel.js
const mongoose = require('mongoose')

const PatronSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  patronType: {
    type: String,
    enum: ['Student', 'Faculty', 'Staff'],
    default: 'Student',
  },
  barcode: {
    type: String,
    unique: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  libraryManagment: {
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Library',
      required: true,
    },
  },
  expiryDate: {
    type: Date,
    default: Date.now,
  },
  messagePreferences: {
    type: Array,
    default: ['email', 'text'],
  },
})

export default mongoose.models.Patron || mongoose.model('Patron', PatronSchema)

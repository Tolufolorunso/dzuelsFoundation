// models/PatronModel.js
const mongoose = require('mongoose')

const PatronSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    middlename: String,
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
      country: String,
    },
    dateOfBirth: Date,
    patronType: {
      type: String,
      enum: ['student', 'teacher', 'staff', 'guest'],
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
      default: 'AAoJ',
    },
    patronExpiryDate: {
      type: Date,
      default: Date.now,
    },
    employerInfo: {
      employerName: String,
      schoolName: String,
      schoolAdress: String,
      headOfSchool: String,
      schoolEmail: String,
      schoolPhoneNumber: String,
    },
    studentSchoolInfo: {
      schoolName: String,
      schoolAdress: String,
      headOfSchool: String,
      currentClass: String,
      schoolEmail: String,
      schoolPhoneNumber: String,
    },
    parentInfo: {
      parentName: String,
      parentAddress: String,
      parentPhoneNumber: String,
      relationshipToPatron: String,
      parentEmail: String,
    },
    image_url: String,
    messagePreferences: {
      type: Array,
      default: ['email'],
    },
    registeredBy: {
      type: String,
      required: true,
      default: 'Admin',
    },
    hasBorrowedBook: {
      type: Boolean,
      default: false,
    },
    checkoutHistory: [
      {
        itemBarcode: {
          type: String,
          ref: 'Cataloging',
        },
        checkoutDate: Date,
        dueDate: Date,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.Patron || mongoose.model('Patron', PatronSchema)

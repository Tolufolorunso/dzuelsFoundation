// models/CatalogingModel.js

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'ima', 'librarian', 'ict', 'facility'],
    default: 'librarian',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)

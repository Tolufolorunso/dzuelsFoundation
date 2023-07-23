// models/CatalogingModel.js

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  libraryLogin: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)

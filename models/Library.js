// models/CatalogingModel.js

const mongoose = require('mongoose')

const LibrarySchema = new mongoose.Schema({
  libraryName: {
    type: String,
    require: true,
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
})

export default mongoose.models.Library ||
  mongoose.model('Library', LibrarySchema)

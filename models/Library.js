// models/CatalogingModel.js

const mongoose = require('mongoose')

const LibrarySchema = new mongoose.Schema({})

export default mongoose.models.Library ||
  mongoose.model('Library', LibrarySchema)

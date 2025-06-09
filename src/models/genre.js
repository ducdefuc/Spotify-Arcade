// src/models/genre.js

import mongoose from 'mongoose'

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

export const Genre = mongoose.model('genres', genreSchema)

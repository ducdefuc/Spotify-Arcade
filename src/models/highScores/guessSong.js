// src/models/highScores/higherOrLower.js

import mongoose from 'mongoose'

const guessSongSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  score: { type: Number, required: true },
  gameMode: { type: String, required: true }
})

export const GuessSongHighScore = mongoose.model('guesssonghighscores', guessSongSchema)

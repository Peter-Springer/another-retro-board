const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  reviewed: Boolean,
  itemId: String
})

const boardSchema = new mongoose.Schema({
 boardName: String,
 uuid: String,
 happy: [itemSchema],
 meh: [itemSchema],
 sad: [itemSchema],
 actionItems: [itemSchema]
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board

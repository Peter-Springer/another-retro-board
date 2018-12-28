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

exports.Board = mongoose.model('Board', boardSchema)
exports.Item = mongoose.model('Item', itemSchema)

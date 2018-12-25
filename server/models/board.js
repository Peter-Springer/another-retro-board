const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
 boardName: String,
 uuid: String,
 happy: Array,
 meh: Array,
 sad: Array,
 actionItems: Array
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board

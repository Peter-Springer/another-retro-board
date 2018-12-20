const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuidv4 = require('uuid/v4')
const app = express()
const server = app.set('port', process.env.PORT || 3001)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.locals.title = 'Another Retro Board';

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;mongoose.connect('mongodb://localhost:27017/RETRO_BOARDS')
const boardSchema = new mongoose.Schema({
 boardName: String,
 uuid: String,
 happy: Array,
 meh: Array,
 sad: Array,
 actionItems: Array
})

const Board = mongoose.model('Board', boardSchema)

app.post('/createBoard', (req, res) => {
  req.body.uuid = uuidv4()
  const newBoard = new Board(req.body)
  newBoard.save()
    .then(item => {
      res.send(req.body)
    })
    .catch(err => {
      res.status(400).send('unable to save to database')
    })
})

app.get('/board/:id', (req, res) => {
  Board.find({uuid: `${req.params.id}`}, (err, board) => {
    res.send(board)
  }).catch(err => {
      res.status(400).send('error finding board')
  });
})

app.post('/addItem', (req, res) => {
  Board.find({uuid: `${req.body.id}`}).then(board => {
    board[0][req.body.listName].push(req.body.item)
    console.log(board[0])
    const newBoard = new Board(board[0])
    newBoard.save()
  }).catch(err => {
      res.status(400).send('error finding board')
  });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = server

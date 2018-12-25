const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const Board = require('./models/board')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/RETRO_BOARDS')

io.on('connection', socket => {

  socket.on('createBoard', board => {
    board.uuid = uuidv4()
    Board.create(board, (err, board) => {
      if (err) return handleError(err)
      socket.emit('sendBoardToClient', board)
    })
  })

  socket.on('boardRequest', boardId => {
    Board.find({uuid: `${boardId}`}, (err, board) => {
      if (err) return handleError(err)
      socket.emit('boardResponse', board)
    })
  })

  socket.on('saveListItem', boardData => {
    Board.find({uuid: `${boardData.id}`}, (err, board) => {
      if (err) return handleError(err)
      board[0][boardData.listName].push(boardData.item)
      Board.create(board, (err, board) => {
        if (err) return handleError(err)
        // broadcast events to all clients including the sender
        io.sockets.emit('boardResponse', board)
      })
    })
  })

})

server.listen(5000, () => {
	console.log("Socket Server is running on http://localhost:5000")
})

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const Models = require('./model/models')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/RETRO_BOARDS')

io.on('connection', socket => {

  socket.on('createBoard', board => {
    board.uuid = uuidv4()
    Models.Board.create(board, (err, board) => {
      if (err) return handleError(err)
      socket.emit('sendBoardToClient', board)
    })
  })

  socket.on('boardRequest', boardId => {
    Models.Board.find({uuid: `${boardId}`}, (err, board) => {
      if (err) return handleError(err)
      socket.emit('boardResponse', board)
    })
  })

  socket.on('saveListItem', boardData => {
    Models.Board.find({uuid: `${boardData.id}`}, (err, board) => {
      if (err) return handleError(err)
      board[0][boardData.listName].push(boardData.item)
      Models.Board.create(board, (err, board) => {
        if (err) return handleError(err)
        // broadcast events to all clients including the sender
        io.sockets.emit('boardResponse', board)
      })
    })
  })

  socket.on('updateList', updateData => {
    Models.Board.find({uuid: `${updateData.boardId}`}, (err, board) => {
      if (err) return handleError(err)
        board[0][updateData.listName].map(item => {
          if (updateData.itemId === item.itemId) {
            item[updateData.attribute] = updateData.requestedUpdate
          }
          return item
        })
        Models.Board.create(board, (err, board) => {
          if (err) return handleError(err)
          io.sockets.emit('boardResponse', board)
        })
    })
  })

  socket.on('removeItem', deleteData => {
    Models.Board.find({uuid: `${deleteData.boardId}`}, (err, board) => {
      if (err) return handleError(err)
      board[0][deleteData.listName] = board[0][deleteData.listName].filter(item => item.itemId != deleteData.itemId)
      Models.Board.create(board, (err, board) => {
        if (err) return handleError(err)
        io.sockets.emit('boardResponse', board)
      })
    })
  })

})

// TODO: MAKE UNIQUE SOCKET CONNECTIONS
// TODO: ADD CORS
// TODO: input validation
// TODO: make responsive
// TODO: try to use _id from mongo

server.listen(5000, () => {
	console.log("Socket Server is running on http://localhost:5000")
})

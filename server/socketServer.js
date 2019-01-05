const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))
const server = require('http').createServer(app)
const io = require('socket.io')(server, { origins: 'http://localhost:3000/'})
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const Models = require('./model/models')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/RETRO_BOARDS')

io.on('connection', (socket) => {

  socket.on('createBoard', board => {
    board.uuid = uuidv4()
    Models.Board.create(board, (err, board) => {
      if (err) return handleError(err)
      socket.emit('sendBoardToClient', board)
    })
  })

  socket.on('boardRequest', boardId => {
    socket.join(boardId)
    Models.Board.find({uuid: `${boardId}`}, (err, board) => {
      if (err) return handleError(err)
      io.to(boardId).emit('boardResponse', board)
    })
  })

  socket.on('saveListItem', boardData => {
    socket.join(boardData.id)
    Models.Board.find({uuid: `${boardData.id}`}, (err, board) => {
      if (err) return handleError(err)
      board[0][boardData.listName].push(boardData.item)
      Models.Board.create(board, (err, board) => {
        if (err) return handleError(err)
        // broadcast events to all clients including the sender
        io.to(boardData.id).emit('boardResponse', board)
        // io.sockets.emit('boardResponse', board)
      })
    })
  })

  socket.on('updateList', updateData => {
    socket.join(updateData.boardId)
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
          io.to(updateData.boardId).emit('boardResponse', board)
        })
    })
  })

  socket.on('removeItem', deleteData => {
    socket.join(deleteData.boardId)
    Models.Board.find({uuid: `${deleteData.boardId}`}, (err, board) => {
      if (err) return handleError(err)
      board[0][deleteData.listName] = board[0][deleteData.listName].filter(item => item.itemId != deleteData.itemId)
      Models.Board.create(board, (err, board) => {
        if (err) return handleError(err)
        io.to(deleteData.boardId).emit('boardResponse', board)
      })
    })
  })

})

// TODO: make responsive
// TODO: try to use _id from mongo

server.listen(5000, () => {
	console.log("Socket Server is running on http://localhost:5000")
})

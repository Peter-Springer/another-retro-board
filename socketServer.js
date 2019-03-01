const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 5000
const io = require('socket.io')(server, { origins: '*:*'})
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const Models = require('./models/models')
const path = require("path")
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RETRO_BOARDS', { useNewUrlParser: true })

io.on('connection', (socket) => {

  socket.on('createBoard', board => {
    board.uuid = uuidv4()
    Models.Board.create(board, (err, board) => {
      if (err) console.log(err)
      socket.emit('sendBoardToClient', board)
    })
  })

  socket.on('boardRequest', boardId => {
    socket.join(boardId)
    Models.Board.find({uuid: `${boardId}`}, (err, board) => {
      if (err) console.log(err)
      io.to(boardId).emit('boardResponse', board)
    })
  })

  socket.on('saveListItem', boardData => {
    socket.join(boardData.id)
    Models.Board.find({uuid: `${boardData.id}`}, (err, board) => {
      if (err) console.log(err)
      board[0][boardData.listName].push(boardData.item)
      Models.Board.create(board, (err, board) => {
        if (err) console.log(err)
        // broadcast events to all clients including the sender
        io.to(boardData.id).emit('boardResponse', board)
        // io.sockets.emit('boardResponse', board)
      })
    })
  })

  socket.on('updateList', updateData => {
    socket.join(updateData.boardId)
    Models.Board.find({uuid: `${updateData.boardId}`}, (err, board) => {
      if (err) console.log(err)
        board[0][updateData.listName].map(item => {
          if (updateData.itemId === item.itemId) {
            item[updateData.attribute] = updateData.requestedUpdate
          }
          return item
        })
        Models.Board.create(board, (err, board) => {
          if (err) console.log(err)
          io.to(updateData.boardId).emit('boardResponse', board)
        })
    })
  })

  socket.on('removeItem', deleteData => {
    socket.join(deleteData.boardId)
    Models.Board.find({uuid: `${deleteData.boardId}`}, (err, board) => {
      if (err) console.log(err)
      board[0][deleteData.listName] = board[0][deleteData.listName].filter(item => item.itemId != deleteData.itemId)
      Models.Board.create(board, (err, board) => {
        if (err) console.log(err)
        io.to(deleteData.boardId).emit('boardResponse', board)
      })
    })
  })

})

// TODO: try to use _id from mongo

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => {
	console.log(`Socket Server is running on http://localhost:${port}`)
})

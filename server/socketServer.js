const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const uuidv4 = require('uuid/v4')

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

io.on('connection', socket => {

  socket.on('createBoard', board => {
    console.log('received board');

    board.uuid = uuidv4()
    const newBoard = new Board(board)
    newBoard.save()
      .then(item => {
        socket.emit('sendBoardToClient', board);
      })
      .catch(err => {
        console.log(`unable to save to database: ${err}`)
      })
  });

  socket.on('boardRequest', boardId => {
    Board.find({uuid: `${boardId}`}, (err, board) => {
      socket.emit('boardResponse', board);
    }).catch(err => {
        console.log(`error finding board: ${err}`)
    });
  });


  socket.on('saveListItem', (boardData) => {
    Board.find({uuid: `${boardData.id}`}).then((board) => {
      board[0][boardData.listName].push(boardData.item)
      console.log(board)
      console.log(board[0])
      const newBoard = new Board(board[0])
      newBoard.save()
      // broadcasts events to all clients including the sender
      io.sockets.emit('boardResponse', board)
    }).catch(err => {
        console.log(`error finding board: ${err}`)
    });
  });

});

server.listen(5000, () => {
	console.log("Socket Server is running on http://localhost:5000");
})

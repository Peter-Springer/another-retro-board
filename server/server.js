const http = require("http");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');
const app = express();
const server = app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.title = 'Another Retro Board';

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/RETRO_BOARDS");
const boardSchema = new mongoose.Schema({
 boardName: String,
 happy: Array,
 meh: Array,
 sad: Array
});

const Board = mongoose.model("Board", boardSchema);

app.post('/createBoard', (req, res) => {
  const newBoard = new Board(req.body);
  newBoard.save()
    .then(item => {
      res.send(req.body);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = server;

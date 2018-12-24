import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import socket from './api/index';

class App extends Component {
constructor() {
  super()
  this.state = {
    boardName: ''
  }
}

componentWillMount() {
  socket.on('sendBoardToClient', board => {
    console.log(board)
    window.location.href = `${board.boardName}/${board.uuid}`
  })
}

  createBoard = () => {
    if (this.state.boardName.length > 0) {
      socket.emit('createBoard', {
        // uuid: '',
        boardName: this.state.boardName,
        happy: [],
        meh: [],
        sad: [],
        actionItems: []
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2 className='App-header'>AnotherRetroBoard</h2>
        <div className="col-3 input-effect">
          <input
            className="effect-17"
            type="text"
            onChange={(e) => this.setState({boardName: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' ? this.createBoard() : null}
          />
        <label>enter a board name</label>
          <span className="focus-border"></span>
        </div>
        <button
          className="action-button shadow animate create-button"
          onClick={() => this.createBoard()}
        >
          create board
        </button>
      </div>
    );
  }
}

export default App

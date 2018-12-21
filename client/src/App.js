import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
constructor() {
  super()
  this.state = {
    boardName: ''
  }
}

  createBoard = () => {
    if (this.state.boardName.length > 0) {
      axios.post('http://localhost:3001/createBoard', {
        boardName: this.state.boardName,
        happy: [],
        meh: [],
        sad: [],
        actionItems: []
      })
      .then(function (response) {
        window.location.href = `${response.data.boardName}/${response.data.uuid}`
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
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

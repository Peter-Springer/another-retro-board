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
        happy: ['ok'],
        meh: ['cool'],
        sad: ['wow']
      })
      .then(function (response) {
        window.location.href = `${response.data.boardName}/${response.data.uuid}`
        console.log(response)
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
        <input
          placeholder='board name'
          onChange={(e) => this.setState({boardName: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' ? this.createBoard() : null}
        />
        <button
          onClick={() => this.createBoard()}
        >
            New Board
        </button>
      </div>
    );
  }
}

export default App

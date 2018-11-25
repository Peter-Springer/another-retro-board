import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
constructor() {
  super()
  this.state = {
    boardName: ''
  }
}

  createBoard = () => {
    axios.post('http://localhost:3001/createBoard', {
      boardName: this.state.boardName,
      happy: [],
      meh: [],
      sad: []
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <input onChange={(e) => this.setState({boardName: e.target.value})}/>
        <button onClick={() => this.createBoard()}>New Board</button>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import axios from 'axios'

class Board extends Component {

  componentDidMount() {
    axios.get(`http://localhost:3001/board/${this.props.match.params.uuid}`)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
    return (
      <h2>BOARD</h2>
    )
  }
}

export default Board

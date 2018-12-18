import React, { Component } from 'react'
import axios from 'axios'
import List from './List'

class Board extends Component {

  constructor() {
    super()
    this.state = {
      happy: [],
      meh: [],
      sad: [],
      actionItems: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/board/${this.props.match.params.uuid}`)
    .then((response) => {
      this.setState({
        happy: [...this.state.happy, ...[response.data[0].happy]],
        meh: [...this.state.meh, ...[response.data[0].meh]],
        sad: [...this.state.sad, ...[response.data[0].sad]],
        actionItems: [...this.state.actionItems, ...[response.data[0].actionItems]]

      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <div className="board-container">
      <List
        columnName={"😁"}
        columnInstructions={"insert happy stuff"}
        data={this.state.happy}
      />
      <List
        columnName={"😕"}
        columnInstructions={"insert meh stuff"}
        data={this.state.meh}
      />
      <List
        columnName={"🥵"}
        columnInstructions={"insert sad/mad stuff"}
        data={this.state.sad}
      />
      <List
        columnName={"🌟"}
        columnInstructions={"insert action items"}
        data={this.state.actionItems}
      />
    </div>
    )
  }
}

export default Board

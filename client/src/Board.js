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
        happy: [...this.state.happy, ...response.data[0].happy],
        meh: [...this.state.meh, ...response.data[0].meh],
        sad: [...this.state.sad, ...response.data[0].sad],
        actionItems: [...this.state.actionItems, ...response.data[0].actionItems]

      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

//TODO: MAKE ONE OBJECT TO HANDLE ALL LIST PROPS
  render() {
    return (
      <div className='board-container'>
      <List
        uuid={this.props.match.params.uuid}
        listName={'happy'}
        columnHeader={'😁'}
        columnInstructions={"What's going well?"}
        data={this.state.happy}
        backgroundColor={"#EFE9AE"}
      />
      <List
        uuid={this.props.match.params.uuid}
        listName={'meh'}
        columnHeader={'😕'}
        columnInstructions={'What are you curious about?'}
        data={this.state.meh}
        backgroundColor={"#FEC3A6"}
      />
      <List
        uuid={this.props.match.params.uuid}
        listName={'sad'}
        columnHeader={'🥵'}
        columnInstructions={"What's not going well?"}
        data={this.state.sad}
        backgroundColor={"#FF928B"}
      />
      <List
        uuid={this.props.match.params.uuid}
        listName={'actionItems'}
        columnHeader={'Action Items'}
        columnInstructions={'Action items'}
        data={this.state.actionItems}
        backgroundColor={"#CDEAC0"}
      />
    </div>
    )
  }
}

export default Board

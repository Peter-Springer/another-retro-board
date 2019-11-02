import React, {Component} from 'react'
import List from './List'
import socket from '../api/index'

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
    socket.emit('boardRequest', this.props.match.params.uuid)
    this.updateBoardState()
  }

  updateBoardState = () => {
    socket.on('boardResponse', board => {
      if (board[0] !== undefined) {
        this.setState({
          happy: board[0].happy,
          meh: board[0].meh,
          sad: board[0].sad,
          actionItems: board[0].actionItems
        })
      } else {
        window.location.href = `/NoBoardExists`
      }
    })
  }

  removeAllItems = (boardId) => {
    socket.emit('removeAllItems', {
      boardId: boardId,
    })
  }

  render() {
    const {uuid} = this.props.match.params
    const {happy, meh, sad, actionItems} = this.state
    return (
    <div>
      <button
       className='clear-board'
       onClick={() => this.removeAllItems(uuid)}
      >
      clear board
      </button>
      <div className='board-container'>
        <div className='list-wrapper'>
            <List
              listProps={{
                          boardId: uuid,
                          listName: 'happy',
                          columnHeader: '😁',
                          columnInstructions: "What's going well?",
                          data: happy,
                          backgroundColor: '#EFE9AE'
                        }}
            />
            <List
              listProps={{
                          boardId: uuid,
                          listName: 'meh',
                          columnHeader: '😕',
                          columnInstructions: 'What are you curious about?',
                          data: meh,
                          backgroundColor: '#FEC3A6'
                        }}
            />
            <List
              listProps={{
                          boardId: uuid,
                          listName: 'sad',
                          columnHeader: '😡',
                          columnInstructions: "What's not going well?",
                          data: sad,
                          backgroundColor: '#FF928B'
                        }}
            />
            <List
              listProps={{
                          boardId: uuid,
                          listName: 'actionItems',
                          columnHeader: '🐼',
                          columnInstructions: 'Add an action item',
                          data: actionItems,
                          backgroundColor: '#CDEAC0'
                        }}
            />
        </div>
       </div>
      </div>
    )
  }
}

export default Board

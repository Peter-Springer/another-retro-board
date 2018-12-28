import React, {Component} from 'react'
import ListItem from './ListItem'
import socket from '../api/index'
import uuidv4 from 'uuid/v4'

class List extends Component {
  constructor() {
    super()
      this.state = {
        itemText: ''
      }
    }

  addItem = (boardId, listName, text) => {
    socket.emit('saveListItem', {
      id: boardId,
      listName: listName,
      item: {text: text, likes: 0, reviewed: false, itemId: uuidv4()}
    })
    this.setState({itemText: ''})
  }

  updateItem = (boardId, itemId, listName, attribute, requestedUpdate) => {
    socket.emit('updateList', {
      boardId: boardId,
      itemId: itemId,
      listName: listName,
      attribute: attribute,
      requestedUpdate: requestedUpdate
    })
  }

  removeItem = (boardId, itemId, listName) => {
    socket.emit('removeItem', {
      boardId: boardId,
      itemId: itemId,
      listName: listName
    })
  }

  render() {
    const {itemText} = this.state
    const {backgroundColor, columnHeader, columnInstructions, listName, boardId, data} = this.props.listProps
    return (
      <section className='list-container' style={{backgroundColor: `${backgroundColor}`}}>
        <h3 className='list-header'>{columnHeader}</h3>
        <input
          className='list-input'
          placeholder={columnInstructions}
          onChange={(e) => this.setState({itemText: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' ? this.addItem(boardId, listName, itemText) : null}
          value={itemText}
        />
      {data.map((data, i) => {
            return (
              <ListItem
                key={i}
                data={data}
                boardId={boardId}
                updateItem={this.updateItem}
                removeItem={this.removeItem}
                listName={listName}
              />
            )}
      )}
      </section>
    )
  }
}

export default List

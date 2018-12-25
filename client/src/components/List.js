import React, {Component} from 'react'
import ListItem from './ListItem'
import socket from '../api/index'

class List extends Component {
  constructor() {
    super()
      this.state = {
        itemText: ''
      }
    }

  addItem = (id, listName, item) => {
      socket.emit('saveListItem', {
        id: id,
        listName: listName,
        item: item
      })
      this.setState({itemText: ''})
  }

  render() {
    const {itemText} = this.state
    const {backgroundColor, columnHeader, columnInstructions, listName, uuid, data} = this.props.listProps
    return (
      <section className='list-container' style={{backgroundColor: `${backgroundColor}`}}>
        <h3 className='list-header'>{columnHeader}</h3>
        <input
          className='list-input'
          placeholder={columnInstructions}
          onChange={(e) => this.setState({itemText: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' ? this.addItem(uuid, listName, itemText) : null}
          value={itemText}
        />
      {data.map((data, i) => {
            return (
              <ListItem
                key={i}
                data={data}
              />
            )}
      )}
      </section>
    )
  }
}

export default List

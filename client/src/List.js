import React, {Component} from 'react'
import axios from 'axios'
import socket from './api/index';

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
    return (
      <section className='list-container' style={{backgroundColor: `${this.props.backgroundColor}`}}>
        <h3 className='list-header'>{this.props.columnHeader}</h3>
        <input
          className='list-input'
          placeholder={this.props.columnInstructions}
          onChange={(e) => this.setState({itemText: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' ? this.addItem(this.props.uuid, this.props.listName, this.state.itemText) : null}
          value={this.state.itemText}
        />
      {this.props.data.map((data, i) => {
            return (<div key={i} className='list-item'>
                     {data}
                   </div>)
        }
        )}
      </section>
    )
  }
}

export default List

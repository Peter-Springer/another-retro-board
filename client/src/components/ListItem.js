import React from 'react'

const ListItem = ({data, updateItem, boardId, listName}) => {
  return (
    <div className='list-item'>
      <div className='list-item-header'>
      <i
        className='material-icons'
      >
        delete
      </i>
      <span hidden={listName === 'actionItems' ? true : false}>
      <i
        className='material-icons'
        style={{'paddingRight': '4px'}}
        onClick={() => updateItem(boardId, data.itemId, listName, 'likes', data.likes + 1)}
      >
        ❤️
      </i>
        {data.likes}
      </span>
      <i
        className='material-icons'
        onClick={() => updateItem(boardId, data.itemId, listName, 'reviewed', !data.reviewed)}
      >
        {data.reviewed ? 'check_box' : 'check_box_outline_blank'}
      </i>
      </div>
      <p className='list-item-text'>{data.text}</p>
    </div>
  )
}

export default ListItem

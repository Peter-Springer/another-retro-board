import React from 'react'

const ListItem = ({data, updateItem, removeItem, boardId, listName}) => {
  return (
    <div
      className='list-item'
      style={data.reviewed ? {'backgroundColor': '#e4e4e4', 'opacity': '0.5'} : null}
    >
      <div className='list-item-header'>
        <i
          className='material-icons'
          onClick={() => removeItem(boardId, data.itemId, listName)}
        >
          delete
        </i>
        <span hidden={listName === 'actionItems' ? true : false}>
        <i
          className='material-icons'
          style={{'paddingRight': '4px'}}
          onClick={() => updateItem(boardId, data.itemId, listName, 'likes', data.likes + 1)}
        >
          <span role="img" aria-label="Heart">❤️</span>
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
      <p
        className='list-item-text'
        style={data.reviewed ? {'textDecoration': 'line-through'} : null}
      >
        {data.text}
      </p>
    </div>
  )
}

export default ListItem

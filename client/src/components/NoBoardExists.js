import React from 'react'

const NoBoardExists = () => {
  return (
    <div className="no-board-container">
      <p>Error: Unable to find board</p>
      <p>Update your URL or create a new board</p>
      <button
      onClick={() => window.location.href = '/'}
      className="action-button shadow animate create-button"
      >
        Create New Board
      </button>
    </div>
  )
}

export default NoBoardExists

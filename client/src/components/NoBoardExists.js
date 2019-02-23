import React from 'react'

const NoBoardExists = () => {
  return (
    <div className="no-board-container">
      <p>We were unable to find a board associated to this URL</p>
      <p>Update your URL or create a new board</p>
      <button>Create New Board</button>
    </div>
  )
}

export default NoBoardExists

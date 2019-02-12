import io from 'socket.io-client'
const port = process.env.PORT || 5000;
const socket = io(`https://anotherretroboard.herokuapp.com:${port}`)

export default socket

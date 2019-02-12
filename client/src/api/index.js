import io from 'socket.io-client'
const port = process.env.PORT;
const socket = io(`http://localhost:${port}`)

export default socket

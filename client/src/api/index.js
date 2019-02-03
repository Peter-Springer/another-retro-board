import io from 'socket.io-client'
const port = process.env.NODE_ENV_PORT || 5000;
const socket = io(`http://localhost:${port}`)

export default socket

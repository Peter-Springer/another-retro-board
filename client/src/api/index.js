require('dotenv').config()
import io from 'socket.io-client'
const port = process.env.PORT || 5000;
const socket = io(`http://localhost:${port}`)

console.log(process.env.PORT)

export default socket

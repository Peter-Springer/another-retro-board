import io from 'socket.io-client'
import uuidv4 from 'uuid/v4'
const socket = io('http://localhost:5000')

export default socket

import io from 'socket.io-client'

let socketIo = io(`http://localhost:1992`)

export{socketIo} 
const app = require('express')()
const http = require('http').Server(app)
const cors = require('./mid-wares/cors')
const startDrone = require('./routes/start-drone')

const port = 6767

app.use(cors)

app.post('/api/', startDrone)

http.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
  console.log('server abruptly stopped')
  process.exit(0)
})



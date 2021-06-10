const http = require('http')
const socketio = require('socket.io')
const app = require('./app');
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');
    
    socket.on('disconnect', () => {
        console.log('Client just left');
    })

})

server.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
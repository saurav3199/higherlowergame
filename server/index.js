const http = require('http')
const socketio = require('socket.io');

const {addUser } = require('./users')
const app = require('./app');
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

io.on('connect', (socket) => {
    console.log(`We have a new connection!!! ${socket.id}`);
    
    socket.on('join', ({userName, roomName}, callback ) => {
        const {error, user} = addUser({id: socket.id, name: userName, room: roomName})
        if(error) return callback(error);
        
        socket.join(user.room)
        console.log(user)
        callback();
    })
    
    socket.on('disconnect', () => {
        console.log('Client just left');
    })

})

server.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
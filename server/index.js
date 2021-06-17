const http = require('http')
const socketio = require('socket.io');
const data = require('./data.json')
const {addUser, removeUser, getUsersInRoom } = require('./users')
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
        io.to(user.room).emit('roomUsers', {room: user.room, users: getUsersInRoom(user.room)})
        console.log(user)   
        callback();
    })
    
    socket.on('startGame', () => {
        const items = Object.keys(data);
        
    })

    socket.on('disconnect', () => {   
        console.log('Client just left');   
        const user = removeUser(socket.id)   
        console.log(user)
        socket.leave(user.room)
        console.log(user)
        if(user){
            io.to(user.room).emit('roomUsers', {room: user.room, users: getUsersInRoom(user.room)})
        }
    })

})

server.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
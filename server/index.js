const http = require('http')
const socketio = require('socket.io');
const data = require('./data.json')

const {addUser, removeUser, getUsersInRoom, getUser } = require('./users')
const app = require('./app');
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});
let items;

function* randomGenerator(len) {
    while(1){
        return Math.floor(Math.random()* len);
    }
}


io.on('connect', (socket) => {
    console.log(`We have a new connection!!! ${socket.id}`);
    
    socket.on('join', ({userName, roomName}, callback ) => {
        const {error, user} = addUser({id: socket.id, name: userName, room: roomName})
        if(error) return callback(error);
        
        socket.join(user.room)   
        io.to(user.room).emit("roomUsers", {room: user.room, users: getUsersInRoom(user.room)})
        console.log(user)   
        callback();
    })
    
    socket.on('startGame', () => {
        items = Object.keys(data);
        // shuffle items 
        // items = items.map(x => [Math.random(), x]).sort(([a], [b]) => a - b).map(([_, x]) => x);
        var randomValue = items[randomGenerator(items.length).next().value]
        firstItem = {"name": randomValue, "value": data[randomValue]}
        randomValue = items[randomGenerator(items.length).next().value]
        secondItem = {"name": randomValue, "value": data[randomValue]}
        console.log(firstItem, secondItem)
        const user = getUser(socket.id)
        io.to(user.room).emit("levelOne", { firstItem, secondItem })
        
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
const http = require('http')
const socketio = require('socket.io');
let dataItems = require('./newdata.json')["items"]

const {addUser, removeUser, getUsersInRoom, getUser, updateUserLevel } = require('./users')
const app = require('./app');
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

function* randomGenerator(len) {
    while(1){
        return Math.floor(Math.random()* len);
    }
}

const getRandomIndexes = (count, prevName) => {
    var randomIndex;
    if (count > 1){
        return [...Array(count).keys()];
    } else if (count == 1){
        do{
            randomIndex = randomGenerator(dataItems.length).next().value
        }   while(prevName === getItemByIndex(randomIndex).name)
        return randomIndex;
    }
    return -1
}

const getItemByIndex = (index) => {
    return dataItems[index];
}

const getNewIndex = (prevImageName) => {
    return getRandomIndexes(1, prevImageName)
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

/*
 *  user starts game then others join  
 *  the game:start fires with loading of items from the backend
 *  the level start the event
 *  1: load the items 
*/


    socket.on('game:level', () => {
        // Needs refactoring later
        console.log(dataItems)
        var items = getRandomIndexes(1)
        const user = getUser(socket.id)
        io.to(user.room).emit("levelOne", items )
    })
    
    socket.on('game:response', ( {volume, volumeToCompare, imageNameToCompare, verdict} ) => {
        console.log(volume, volumeToCompare, verdict)
        if  ( volume === volumeToCompare || 
            ( verdict === "Higher" && volume < volumeToCompare) ||
            ( verdict === "Lower" && volume > volumeToCompare)) {
                updateUserLevel(socket.id)
                console.log("updated")
                socket.emit('game:level', getItemByIndex(getNewIndex(imageNameToCompare)) )
        } else {
            updateUserLevel(socket.id, 0)
            // spectator
            socket.emit('game:end')
        }

    })

    socket.on('game:load', () => {
        //# Bug: if this start takes time then the items will not have data, or 
        // the reproducible reason may be wrong by using setTimeout  
        // setTimeout( () => {
        // items = Object.keys(data);
        // }, 100)
        dataItems = dataItems.sort( () => 0.5 - Math.random() )
        items = getRandomIndexes(2).map( (index) => getItemByIndex(index))
        const user = getUser(socket.id)
        io.to(user.room).emit("levelOne", ...items )
        console.log('running');
    })

    socket.on('disconnect', () => {   
        console.log('Client just left');   
        const user = removeUser(socket.id)   
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
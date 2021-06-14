import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getUser, loginUser } from "../utils/usernameHandler";
import Users from "./Users";
import "./Game.css";

let socket;
const ENDPOINT = 'localhost:5000'

const Game = ( {location} ) => {
  const [roomName, setRoomName ] = useState('')
  const [userName, setUserName] = useState("")
  const [users, setUsers] = useState([])
  // const [admin, setAdmin] = useState(false)
  const [isLoggedin, setisLoggedin] = useState(false)

  console.log(userName, roomName, users)

// User joins a room 
  useEffect(() => {
    let storedUser = getUser()
    socket = io(ENDPOINT)

    if(!storedUser){
      let newUser = prompt("Enter your username")      
      while(newUser === ""){
        newUser = prompt("Enter your username")
      }
      loginUser(newUser)
      storedUser = newUser
    }
    console.log(`${userName}, ${roomName}`)
    const room = location.pathname.split('/')[2];
    setUserName(storedUser)
    setRoomName(room)
    console.log(`sent: ${storedUser}, ${room}`)

    socket.emit('join', { userName: storedUser, roomName: room }, (error) => {
      if(error){
        alert(error)
      }
    });

  }, [ENDPOINT]);

// Get list of users, first user is admin
  useEffect(() => {
    console.log(socket);
    socket.on("roomUsers", ({users}) => {
      console.log(users);
      setUsers(users)
      if(users[0] === userName){
        // send the Start Game option
      }
    })
  }, [])

  const startGame = () => {
    socket.emit("startGame", )
  }

  const image = "http://api.higherlowergame.com/_client/images/general/lsd.jpg";
  const style = {
    backgroundImage: `url(${image})`
  }
  return (
    <div>
      <Users users={users} />
      <div style={style} className="pack-term">hello</div>
      <button type="submit" onClick={startGame} disabled={users.length > 0 ? users[0].name !== userName : false}> Start Game</button>
    </div>

  )
}

export default Game;
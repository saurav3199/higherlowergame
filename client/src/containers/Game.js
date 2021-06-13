import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getUser } from "../utils/usernameHandler";

let socket;
const ENDPOINT = 'localhost:5000'

const Game = ( {location} ) => {
  const [roomName, setRoomName ] = useState('')

  const [userName, setUserName] = useState("")
  const [isLoggedin, setisLoggedin] = useState(false)


  useEffect( () => {
    const storedUser = getUser()
    if(! storedUser){
      alert(error);
    }
    else if(!userName || !roomName){
      setUserName(storedUser)
      const room = location.pathname.split('/')[2];
      setRoomName(room)
    }
    else{
      socket = io(ENDPOINT)
      console.log(userName, roomName);
      socket.emit('join', { userName, roomName }, (error) => {
        if(error){
        }
      });     
    }
  }, [ENDPOINT, userName, roomName])

  return (
    <div />
  )
}

export default Game;
import React, { useEffect, useState } from "react";

let socket;

const Game = ( {location} ) => {
  const [room, setRoom ] = useState('')

  const [userName, setUserName] = useState("")
  const [isLoggedin, setisLoggedin] = useState(false)

  const validateRoom = () => {

  }

  useEffect( () => {
    setRoom(location.pathname.split('/')[2])
    validateRoom()
  })

  return (
    <div />
  )
}

export default Game;
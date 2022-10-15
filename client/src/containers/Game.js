import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getUser, loginUser } from "../utils/usernameHandler";
import Users from "./Users";
import LiveScreen from "./LiveScreen";
import GameScreen from "./GameScreen";

let socket;
const ENDPOINT = "localhost:5000";

const Game = ({ location }) => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [started, setStarted] = useState(false);

  // console.log(userName, roomName, users);

  // User joins a room
  useEffect(() => {
    let storedUser = getUser(); // fetches the player's username from browser session.storage
    socket = io(ENDPOINT);

    if (!storedUser) {
      let newUser = prompt("Enter your username");
      while (newUser === "") {
        newUser = prompt("Enter your username");
      }
      loginUser(newUser);
      storedUser = newUser;
    }
    console.log(`${userName}, ${roomName}`);
    const room = location.pathname.split("/")[2]; // game id ;
    setUserName(storedUser);
    setRoomName(room);
    console.log(`sent: ${storedUser}, ${room}`);

    socket.emit("join", { userName: storedUser, roomName: room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    // Send the request
  }, [ENDPOINT]);

  // Get list of users, first user is admin
  useEffect(() => {
    console.log(socket);
    socket.on("roomUsers", ({ users }) => {
      console.log("THis is the list of the users", users);
      setUsers(users);
    });
  }, []);

  return (
    <>
      <Users users={users} />
      {!started ? (
        <GameScreen
          users={users}
          userName={userName}
          socket={socket}
          setStarted={setStarted}
        />
      ) : (
        <LiveScreen socket={socket} setStarted={setStarted} />
      )}
    </>
  );
};

export default Game;

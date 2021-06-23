import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getUser, loginUser } from "../utils/usernameHandler";
import Users from "./Users";
import Image from "./Image";
import "./Game.css";

let socket;
const ENDPOINT = "localhost:5000";

const Game = ({ location }) => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [started, setStarted] = useState(false);
  const [imageData, setImageData] = useState([]);

  console.log(userName, roomName, users);

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
      console.log(users);
      setUsers(users);
    });
  }, []);

  // Start the level One of game
  useEffect(() => {
    socket.on("levelOne", ({ firstItem, secondItem }) => {
      setImageData([firstItem, secondItem]);
      setStarted(true);
      console.log(firstItem, secondItem);
    });
  }, []);

  const startGame = (event) => {
    socket.emit("startGame");
  };

  const gameScreen = () => {
    return (
      <div class="body-wrapper">
        <div>
          <button
            type="submit"
            onClick={startGame}
            disabled={users.length > 0 ? users[0].name !== userName : false}
          >
            {" "}
            Start Game
          </button>
        </div>
      </div>
    );
  };

  const liveScreen = () => {
    const sendAnswer = (event) => {
      console.log(event.target);
    };
    return (
      <div>
        <Image imageData={imageData[0]} position={"left"} />
        <Image
          imageData={imageData[1]}
          position={"right"}
          sendAnswer={sendAnswer}
        />
      </div>
    );
  };

  return (
    <>
      <Users users={users} />
      {!started ? gameScreen() : liveScreen()}
    </>
  );
};

export default Game;

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
      console.log("THis is the list of the users", users);
      setUsers(users);
    });
  }, []);

  // Game manipulation
  useEffect(() => {
    // Start the level One of game
    socket.on("levelOne", (firstItem, secondItem) => {
      setImageData([firstItem, secondItem]);
      setStarted(true);
      console.log(firstItem, secondItem);
    });

    // Start the next levels
    socket.on("game:level", (newItem) => {
      console.log(newItem);
      setImageData([imageData[1], newItem]);
      console.log(newItem["term"]);
    });

    // Game ends
    socket.on("game:end", () => {
      setStarted(false);
    });
  });

  const startGame = (event) => {
    socket.emit("game:load");
    // socket.emit("game:level");
  };

  const gameScreen = () => {
    return (
      <div className="body-wrapper">
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
    const sendAnswer = (response) => {
      console.log(response, imageData[0]["searchVolume"]);
      socket.emit("game:response", {
        volume: imageData[0]["searchVolume"],
        volumeToCompare: imageData[1]["searchVolume"],
        imageNameToCompare: imageData[1]["term"],
        verdict: response,
      });
      // gameState:  submitted
      // console.log(event.target.value);
    };
    return (
      <div class="ImageContainer">
        <div class="LeftImageContainer">
          <Image imageData={imageData[0]} position={"left"} />{" "}
        </div>
        <div class="RightImageContainer">
          <Image
            imageData={imageData[1]}
            position={"right"}
            sendAnswer={sendAnswer}
          />
        </div>
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

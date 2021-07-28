import Image from "./Image";
import { useState, useEffect } from "react";

const LiveScreen = ({ socket, setStarted }) => {
  const [imageData, setImageData] = useState([]);

  // Game manipulation
  useEffect(() => {
    // Start the level One of game
    socket.on("levelOne", (firstItem, secondItem) => {
      setImageData([firstItem, secondItem]);
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
    <div class="imageContainer">
      <div class="leftImageContainer">
        <Image imageData={imageData[0]} position={"left"} />{" "}
      </div>
      <div className="centerTimerContainer"></div>
      <div class="rightImageContainer">
        <Image
          imageData={imageData[1]}
          position={"right"}
          sendAnswer={sendAnswer}
        />
      </div>
    </div>
  );
};

export default LiveScreen;

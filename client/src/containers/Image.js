import React from "react";
import "./Image.css";

const Image = ({ imageData, position, sendAnswer }) => {
  // console.log(position, sendAnswer);
  if (!imageData) return <>image not rendered</>;

  return (
    <>
      <div
        className="imageContainer"
        style={{ backgroundImage: `url(${imageData.image})` }}
      >
        {/* <img src={imageData.image} alt={imageData.term} /> */}
        <p style={{ color: "red" }}>Name: {imageData.term}</p>
        {position === "left" && (
          <div style={{ color: "blue" }}>Value: {imageData.searchVolume}</div>
        )}
      </div>

      <div className="buttonContainer">
        {position === "right" && (
          <>
            <button className="gameButton" onClick={() => sendAnswer("Higher")}>
              Hi
            </button>
            <button className="gameButton" onClick={() => sendAnswer("Lower")}>
              Lo
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Image;

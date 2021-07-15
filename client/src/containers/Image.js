import React from "react";


const Image = ({imageData, position, sendAnswer}) => {
  console.log(position, sendAnswer);
  if(!imageData)
    return (
      <> 
        image not rendered
      </>
    )

  return (
    <>
      <img src={imageData.image} alt={imageData.term} />
      <p style={{ color: "red"}}> 
        Name: {imageData.term}
      </p>
      { position === "left" && 
        <div style={{ color: "red"}}>
          Value: {imageData.searchVolume}
        </div>
      }
      { position === "right" && 
        <>
          <button onClick={() => sendAnswer("Higher")}>Hi</button>
          <button onClick={() => sendAnswer("Lower")}>Lo</button>
        </>
      }
    </>
  )
}

export default Image
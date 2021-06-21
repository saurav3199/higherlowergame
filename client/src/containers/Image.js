import React from "react";

const Image = ({imageData, position, sendAnswer}) => {
  console.log(imageData);
  return (
    <>
      <img src={imageData.value.image} alt={imageData.name} />
      { position === "right" && <button onClick={sendAnswer}>Increase</button>}
    </>
  )
}

export default Image
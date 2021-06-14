import React, { useState } from "react";
import { useHistory } from "react-router";
import { loginUser } from "../utils/usernameHandler";
import "./Home.css";

const generateGameId = () => {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  var Id = "" 
  for(var i = 1 ; i < 12 ; i ++ ){
    if(i %4 ==0 && i != 0 )
      Id += "-"
    else
      Id += charset.charAt( Math.floor( (Math.random() * charset.length) ));
  }
  return Id;
}


const Home = () => {

  const [username, setUsername] = useState('')
  const history= useHistory()

  const userJoin = (event) => {
    event.preventDefault();
    event.target.username.value = "";
    console.log(username)
    loginUser(username)
    const gameId = generateGameId()
    history.push(`/game/${gameId}`)
  }

  return (

    <div className = "outerContainer">
      <div className = "innerContainer1">
        <h1>Start Game</h1>
        <form onSubmit={userJoin}>
          username: <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          <button type="submit">submit</button> 
        </form>

      </div>

      <div className = "innerContainer2">
        {/* Enter username and create invite link */ }
          <h1>Join Game</h1>
        {/* Optional: enter link to join the game | you can use the link to directly visit */ }
      </div>
    </div>
  )
}

export default Home;
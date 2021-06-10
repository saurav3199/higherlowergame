import React, { useState } from "react";
import { useHistory } from "react-router";

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
    console.log(username)
    setUsername('')
    const gameId = generateGameId()
    history.push(`/game/${gameId}`)
  }

  return (

    <div>
      <div>
        <h1>Start Game</h1>
        <form onSubmit={userJoin}>
          username: <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          <button type="submit">submit</button> 
        </form>

      </div>
      {/* Enter username and create invite link */ }
      <h1>Join Game</h1>
      {/* Optional: enter link to join the game | you can use the link to directly visit */ }
    </div>
  )
}

export default Home;
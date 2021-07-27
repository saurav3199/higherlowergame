import "./Game.css";

const GameScreen = ({users, userName, socket, setStarted}) => {

const startGame = (event) => {
  socket.emit("game:load");
  setStarted(true);

  // socket.emit("game:level");
};

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

export default GameScreen;
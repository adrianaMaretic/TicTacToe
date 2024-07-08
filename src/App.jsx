import { useState } from "react";
import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { Log } from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectField(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    let previousPlayer = "X";

    if (previousPlayer === "X") {
      previousPlayer === "O";
    } else {
      previousPlayer === "X";
    }

    setGameTurns((prevTurns) => {
      let currPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currPlayer = "O";
      } else {
        currPlayer = "X";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        <GameBoard
          playerSymbol={handleSelectField}
          turns={gameTurns}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;

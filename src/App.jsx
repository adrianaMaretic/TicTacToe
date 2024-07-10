import { useState } from "react";
import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { Log } from "./components/Log";
import { GameOver } from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = { X: "Player 1", O: "Player 2" };

function deriveActivePlayer(turns) {
  let currPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currPlayer = "O";
  } else {
    currPlayer = "X";
  }
  return currPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const currPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  function handleSelectField(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handleChangeName(symbol, newName) {
    setPlayers((previousNames) => {
      return { ...previousNames, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={currPlayer === "X"}
            changeName={handleChangeName}
          ></Player>
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={currPlayer === "O"}
            changeName={handleChangeName}
          ></Player>
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestartGame}></GameOver>
        )}
        <GameBoard
          playerSymbol={handleSelectField}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}
export default App;

import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function GameBoard({playerSymbol, activeSymbol}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleUpdateBoard(rowIndex, symbolIndex) {
    setGameBoard((previousBoard) => {
      const updatedBoard = [
        ...previousBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][symbolIndex] =activeSymbol;
      return updatedBoard;
    });

    playerSymbol();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => handleUpdateBoard(rowIndex, symbolIndex)}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function GameBoard({ playerSymbol, turns }) {
  const gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
}

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button onClick={()=>playerSymbol(rowIndex,symbolIndex)}>
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

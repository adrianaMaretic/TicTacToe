export function Log({ turns }) {
  return (
    <ol id="log">
      {turns &&
        turns.map((log) => (
          <li key={`${log.square.row}${log.square.col}`}>{`Player ${log.player} played ${log.square.row}, ${log.square.col}`}</li>
        ))}
    </ol>
  );
}

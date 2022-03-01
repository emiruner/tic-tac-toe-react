const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function makeTicTacToe(squares, nextPlayer) {
  function isDraw() {
    for (let i = 0; i < squares.length; ++i) {
      if (squares[i] == null) {
        return false;
      }
    }

    return true;
  }

  function findWinnerInLine(line) {
    const [a, b, c] = line;

    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    } else {
      return null;
    }
  }

  function determineWinner() {
    for (let i = 0; i < lines.length; ++i) {
      const winner = findWinnerInLine(lines[i]);

      if (winner) {
        return winner;
      }
    }

    return isDraw() ? "D" : null;
  }

  const winner = determineWinner();

  function play(i) {
    if (squares[i] || winner) {
      return [false, this];
    } else {
      const squaresCopy = squares.slice();
      squaresCopy[i] = nextPlayer;

      return [true, makeTicTacToe(squaresCopy, nextPlayer === "X" ? "O" : "X")];
    }
  }

  return {squares, nextPlayer, winner, play};
}

export default function ticTacToe() {
  return makeTicTacToe(Array(9).fill(null), "X");
}

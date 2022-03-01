import ticTacToe from "./tic-tac-toe";

function makeTicTacToeWithHistory(history, currentIndex) {
  function current() {
    return history[currentIndex];
  }

  function pushItem(played) {
    return makeTicTacToeWithHistory(history.slice(0, currentIndex + 1).concat(played), currentIndex + 1);
  }

  function selectCurrent(newCurrentIndex) {
    return makeTicTacToeWithHistory(history, newCurrentIndex);
  }

  return {current, pushItem, selectCurrent, history, currentIndex};
}

export default function ticTacToeWithHistory() {
  return makeTicTacToeWithHistory([ticTacToe()], 0);
}

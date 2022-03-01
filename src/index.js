import React, {useState} from "react";
import ReactDOM from "react-dom";
import ticTacToeWithHistory from "./tic-tac-toe-with-history";

import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick(props.index)}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return (
      <Square key={i} index={i} value={props.squares[i]} onClick={props.onClick}/>
    );
  }

  let rows = [];

  for (let i = 0; i < 3; ++i) {
    let cells = [];

    for (let j = 0; j < 3; ++j) {
      cells.push(renderSquare(i * 3 + j));
    }

    rows.push(<div key={i} className="board-row">{cells}</div>);
  }

  return (<div>{rows}</div>);
}

function GameHistory(props) {
  const labels = ["Goto game start"];
  for (let i = 1; i < props.history.length; ++i) {
    labels.push("Go to move #" + i);
  }

  const items = labels.map((label, index) =>
    <li key={index}>
      <button onClick={() => props.onItemClick(index)}>
        <span className={props.selected === index ? "selected" : ""}>{label}</span>
      </button>
    </li>
  );

  return <ol>{items}</ol>;
}

function Game() {
  const [state, setState] = useState(ticTacToeWithHistory);

  function onBoardClick(cell) {
    const [played, newState] = state.current().play(cell);

    if (played) {
      setState(state.pushItem(newState));
    }
  }

  function onHistoryItemClick(index) {
    setState(state.selectCurrent(index));
  }

  function status() {
    switch (state.current().winner) {
      case "D":
        return "Draw";

      case "X":
      case "O":
        return "Winner: " + state.current().winner;

      default:
        return "Next player: " + state.current().nextPlayer;
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.current().squares} onClick={onBoardClick}/>
      </div>
      <div className="game-info">
        <div className="status">{status()}</div>
        <GameHistory selected={state.currentIndex} history={state.history} onItemClick={onHistoryItemClick}/>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game/>,
  document.getElementById("root")
);

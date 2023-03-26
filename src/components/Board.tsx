import { useState } from "react";
import "./Board.css";

import Cell, { CellValue } from "./Cell";

export enum CurrentMove {
  X = "X",
  O = "O",
}

const Board = () => {
  const [board, setBoard] = useState<CellValue[]>(
    Array(9).fill(CellValue.Empty)
  );

  const [currentMove, setCurrentMove] = useState<CurrentMove>(CurrentMove.X);
  const [gameEnded, setGameEnded] = useState(false);

  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const hasWon = (board: CellValue[]) => {
    for (const winningMove of winningMoves) {
      const [a, b, c] = winningMove;
      if (
        board[a] !== CellValue.Empty &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const handleClick = (index: number) => {
    if (gameEnded) return;
    if (board[index] !== CellValue.Empty) return;

    const newBoard = [...board];
    newBoard[index] = currentMove === CurrentMove.X ? CellValue.X : CellValue.O;
    setBoard(newBoard);

    if (hasWon(newBoard)) {
      setGameEnded(true);
      return;
    }

    setCurrentMove((currentMove) =>
      currentMove === CurrentMove.X ? CurrentMove.O : CurrentMove.X
    );
  };

  function getCells() {
    const cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(
        <Cell key={i} index={i} value={board[i]} handleClick={handleClick} />
      );
    }

    return cells;
  }

  return (
    <div className="wrapper">
      <h1>Tic Tac Toe</h1>
      <h2>Current Move: {currentMove}</h2>
      <div className="board">{getCells()}</div>
    </div>
  );
};

export default Board;

import React, { Component } from 'react';
import './style.css';
import SudokuRow from '../SudokuRow';

const board = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
]

class SudokuBoard extends Component {
  render() {
    return (
      <div className="Sudoku-board">
        { board.map((row, idx) => {
          return <SudokuRow key={ idx } row={ row }/>
        }) }
      </div>
    );
  }
}

export default SudokuBoard;

import React, { Component } from 'react';
import './style.css';
import SudokuRow from '../SudokuRow';

const newBoard = [
  [0,0,0,2,6,0,7,0,1],
  [6,8,0,0,7,0,0,9,0],
  [1,9,0,0,0,4,5,0,0],
  [8,2,0,1,0,0,0,4,0],
  [0,0,4,6,0,2,9,0,0],
  [0,5,0,0,0,3,0,2,8],
  [0,0,9,3,0,0,0,7,4],
  [0,4,0,0,5,0,0,3,6],
  [7,0,3,0,1,8,0,0,0]
]

// To differentiate between starting numbers and immutable inputs
let board = newBoard.map( row => {
  return row.map( value => {
    if (value) return { value: value, isImmutable: true };
    return { value: value, isImmutable: false };
  })
})

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

import React, { Component } from 'react';
import './style.css'

const SudokuSquare = (props) => {
  let square;
  if (props.sq.isImmutable) {
    square = (
      <div className="Immutable-sudoku-square">
        {props.sq.value}
      </div>
    )
  } else {
    square = (
      <div className="Mutable-sudoku-square" onClick={function(){console.log('clicked')}}>
        {props.sq.value}
      </div>
    )
  }
  return (
    <div className="Sudoku-square">
      {square}
    </div>
  )
}


export default SudokuSquare;

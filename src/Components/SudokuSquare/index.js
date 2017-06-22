import React from 'react';
import './style.css';

const SudokuSquare = (props) => {
  let square;
  if (props.sq.isImmutable) {
    square = (
      <h5 className='immutable'>
        {props.sq.value}
      </h5>
    )
  } else {
    square = (
      <h5>
        {props.sq.value}
      </h5>
    )
  }
  return (
    <div className="Sudoku-square">
      {square}
    </div>
  )
}


export default SudokuSquare;

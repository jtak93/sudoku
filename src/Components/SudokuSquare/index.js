import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './style.css';

const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
  { key: 6, text: '6', value: 6 },
  { key: 7, text: '7', value: 7 },
  { key: 8, text: '8', value: 8 },
  { key: 9, text: '9', value: 9 },
]

const SudokuSquare = (props) => {
  let square;
  if (props.sq.isImmutable) {
    square = (
      <h5>{props.sq.value}</h5>
    )
  } else {
    square = (
      <Dropdown
        options={options}
        className="Square-dropdown"
        placeholder={props.sq.value.toString()}
        rowIndex={ props.rowIndex }
        colIndex={ props.colIndex }
        onChange={ props.onInputChange } />
    )
  }
  return (
    <div className="Sudoku-square">
      {square}
    </div>
  )
}


export default SudokuSquare;

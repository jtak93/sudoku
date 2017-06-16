import React, { Component } from 'react';
import SudokuSquare from '../SudokuSquare';
import './style.css'

class SudokuRow extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div className="Sudoku-row">
        { this.props.row.map((sq, idx) => {
          return <SudokuSquare key={ idx } value={ sq }/>
        }) }
      </div>
    );
  }
}

export default SudokuRow;

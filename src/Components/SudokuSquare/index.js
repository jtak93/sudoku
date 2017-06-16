import React, { Component } from 'react';
import './style.css'

class SudokuSquare extends Component {
  render() {
    return (
      <div className="Sudoku-square">
        {this.props.value}
      </div>
    );
  }
}

export default SudokuSquare;

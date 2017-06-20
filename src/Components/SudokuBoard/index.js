import React, { Component } from 'react';
import './style.css';
import SudokuSquare from '../SudokuSquare';
import { Grid } from 'semantic-ui-react'

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
  constructor(props) {
    super(props);
    this.state = {
      board: board
    };

    this.handleSquareClick = this.handleSquareClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidUpdate() {
    console.log(this.state)
  }
  handleSquareClick(rowIdx, colIdx) {
    console.log(rowIdx, colIdx)
  }

  handleInputChange(evt, data) {
    const row = data.rowIndex;
    const col = data.colIndex;
    let newBoard = this.state.board;
    // set new value
    newBoard[row][col].value = data.value;
    this.setState({
      board: newBoard
    })
    console.log(this.state)
  }
  render() {
    return (
      <div className="Sudoku-board">
        <Grid columns='nine' textAlign='center' celled>
          { this.state.board.map((row, rowIndex) => {
            return (
              <Grid.Row key={rowIndex}>
                { row.map((sq, colIndex) => {
                  return (
                    <Grid.Column key={colIndex} className='Grid-cell'>
                      <SudokuSquare
                        key={ colIndex }
                        sq={ sq }
                        rowIndex={ rowIndex }
                        colIndex={ colIndex }
                        onSquareClick={ this.handleSquareClick }
                        onInputChange={ this.handleInputChange } />
                    </Grid.Column>
                  )
                }) }
              </Grid.Row>
            )
          }) }
        </Grid>
      </div>
    );
  }
}

export default SudokuBoard;

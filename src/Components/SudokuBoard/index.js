import React, { Component } from 'react';
import './style.css';
import SudokuSquare from '../SudokuSquare';
import { Grid } from 'semantic-ui-react';
import OutsideAlerter from '../OutsideAlerter';

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
    if (value) return { value: value, isImmutable: true, isActive: false };
    return { value: value, isImmutable: false, isActive: false };
  })
})

class SudokuBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: board
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.turnCellInactive = this.turnCellInactive.bind(this);
  }

  handleSquareClick(rowIdx, colIdx, data, evt) {
    // switch cell to active if cell is mutable
    let newBoard = this.state.board;
    if (!newBoard[rowIdx][colIdx].isImmutable) {
      newBoard[rowIdx][colIdx].isActive = true;
    }
    this.setState({
      board: newBoard
    })
  }

  turnCellInactive(rowIdx, colIdx, data) {
    var cell = data;
    cell.isActive = false;
    let newBoard = this.state.board;
    // set new value
    newBoard[rowIdx][colIdx].isActive = false;
    this.setState({
      board: newBoard
    })
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
  }
  render() {
    return (
      <div className="Sudoku-board">
        <Grid columns='nine' textAlign='center' celled>
          { this.state.board.map((row, rowIndex) => {
            return (
              <Grid.Row key={rowIndex}>
                { row.map((sq, colIndex) => {
                  let border = 'hide-active';
                  if (sq.isActive) border = 'show-active';
                  return (
                    <Grid.Column key={colIndex} onClick={this.handleSquareClick.bind(this, rowIndex, colIndex, sq)} className={ border }>
                      <OutsideAlerter data={sq} turnCellInactive={this.turnCellInactive.bind(this, rowIndex, colIndex, sq)}>
                        <SudokuSquare
                          key={ colIndex }
                          sq={ sq }
                          rowIndex={ rowIndex }
                          colIndex={ colIndex }
                          onSquareClick={ this.handleSquareClick }
                          onInputChange={ this.handleInputChange } />
                      </OutsideAlerter>
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

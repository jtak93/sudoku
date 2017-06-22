import React, { Component } from 'react';
import './style.css';
import SudokuSquare from '../SudokuSquare';
import { Grid } from 'semantic-ui-react';
import OutsideAlerter from '../OutsideAlerter';

const newBoard = [
  ['','','',2,6,'',7,'',1],
  [6,8,'','',7,'','',9,''],
  [1,9,'','','',4,5,'',''],
  [8,2,'',1,'','','',4,''],
  ['','',4,6,'',2,9,'',''],
  ['',5,'','','',3,'',2,8],
  ['','',9,3,'','','',7,4],
  ['',4,'','',5,'','',3,6],
  [7,'',3,'',1,8,'','','']
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
      board: board,
      activeCell: null
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.turnCellInactive = this.turnCellInactive.bind(this);
  }

  _handleKeyDown(event) {
    // check to see if key pressed is 1-9 and is active
    if (event.keyCode >= 49 && event.keyCode <= 57 && this.state.activeCell) {
      const row = this.state.activeCell[0];
      const col = this.state.activeCell[1];
      let newBoard = this.state.board;
      if (!newBoard[row][col].isImmutable) {
        newBoard[row][col].isActive = false;
        newBoard[row][col].value = event.keyCode - 48;
      }
      this.setState({
        board: newBoard,
        activeCell: null
      })
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  handleSquareClick(rowIdx, colIdx, data, evt) {
    // switch cell to active if cell is mutable
    let newBoard = this.state.board;
    if (!newBoard[rowIdx][colIdx].isImmutable) {
      newBoard[rowIdx][colIdx].isActive = true;
    }
    this.setState({
      board: newBoard,
      activeCell: [rowIdx, colIdx]
    })
  }

  turnCellInactive(rowIdx, colIdx, data) {
    var cell = data;
    cell.isActive = false;
    let newBoard = this.state.board;
    // set new value
    newBoard[rowIdx][colIdx].isActive = false;
    this.setState({
      board: newBoard,
      activeCell: null
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
                          onSquareClick={ this.handleSquareClick } />
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

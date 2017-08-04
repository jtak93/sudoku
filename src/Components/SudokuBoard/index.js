import React, { Component } from 'react';
import './style.css';
import SudokuSquare from '../SudokuSquare';
import { Grid, Button, Message } from 'semantic-ui-react';
import OutsideAlerter from '../OutsideAlerter';

const newBoard = [
  ['',4,8,'','','','',6,2],
  ['','',5,'',6,'','','',8],
  ['','','',1,'','',4,'',''],
  ['','','',8,'','',2,'',''],
  ['',9,'',6,'',5,'',3,''],
  ['','',3,'','',7,'','',''],
  ['','',1,'','',9,'','',''],
  [9,'','','',4,'',7,'',''],
  [3,7,'','','','',6,8,9]
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
      activeCell: null,
      solutionValid: false,
      showMessage:false,
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.turnCellInactive = this.turnCellInactive.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.isValidSolution = this.isValidSolution.bind(this);
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
        activeCell: null,
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

  checkSolution() {
    if (this.isValidSolution()) {
      this.setState({
        solutionValid: true,
        showMessage:true,
        message: 'You Win!'
      })
    } else {
      this.setState({
        solutionValid: false,
        showMessage: true,
        message: 'Not a Valid Solution'
      })
    }
  }

  isValidSolution() {
    let isSolution = true;
    //
    //Check Rows
    let boardValues = this.state.board.map(row => {
      return row.map(col => {
        return col.value
      })
    })

    let rows = boardValues.map(row => {
      // create copy to prevent mutation of board when sorting
      let temp = row.slice();
      let sortedRow = temp.sort().map((num, i) => {
        if (num !== i + 1) isSolution = false;
        return num;
      })
    })

    // Check Columns
    for (let i = 0; i < 9; i++) {
      let col = boardValues.map(row => {
        return row[i]
      })
      let sortedColumn = col.sort().map((num, i) => {
        if (num !== i + 1) isSolution = false
        return num;
      })
    }
    // Check block 1,2,3,4,5,6,7,8,9
    for (let j = 0; j <= 6; j+=3) {
      for (let i = 0; i <= 6; i+=3) {
        let block = boardValues[j].slice(i, i+3)
          .concat(boardValues[j+1].slice(i, i+3))
          .concat(boardValues[j+2].slice(i, i+3))

        let sortedBlock = block.sort().map((num, idx) => {
            if (num !== idx + 1) isSolution = false
            return num
        })
      }
    }

    return isSolution;
  }

  render() {
    return (
      <div className='Sudoku-container'>
        <Message error={!this.state.solutionValid} hidden={!this.state.showMessage} content={this.state.message} />

        <Grid className="Sudoku-board" columns='nine' textAlign='center' celled>
          { this.state.board.map((row, rowIndex) => {
            return (
              <Grid.Row className='board-row' key={rowIndex}>
                { row.map((sq, colIndex) => {
                  let border = 'hide-active';
                  if (sq.isActive) border = 'show-active';
                  return (
                    <Grid.Column className='board-square' key={colIndex} onClick={this.handleSquareClick.bind(this, rowIndex, colIndex, sq)} className={ border }>
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
        <Button onClick={this.checkSolution}>Check solution</Button>
      </div>
    );
  }
}

export default SudokuBoard;

import React, { Component } from 'react';
import SudokuSquare from '../SudokuSquare';
import { Grid } from 'semantic-ui-react';


class SudokuRow extends Component {
  render() {
    return (
      <div className="Sudoku-row">
          { this.props.row.map((sq, idx) => {
            return (
              <Grid.Cell>
                <SudokuSquare
                  key={ idx } sq={ sq }
                  rowIndex={this.props.rowIndex}
                  colIndex={ idx }
                  onSquareClick={this.props.onSquareClick}
                  onInputChange={ this.props.onInputChange } />
              </Grid.Cell>
            )
          }) }
      </div>
    );
  }
}

export default SudokuRow;

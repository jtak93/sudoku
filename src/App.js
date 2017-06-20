import React, { Component } from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Sudoku</h1>
        <SudokuBoard />
      </div>
    );
  }
}

export default App;

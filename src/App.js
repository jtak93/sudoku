import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuBoard from './Components/SudokuBoard'

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

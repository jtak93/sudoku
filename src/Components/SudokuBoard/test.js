import React from 'react';
import SudokuBoard from './index.js';
import renderer from 'react-test-renderer';

test('Sudoku Board renders', () => {
  const component = renderer.create(
    <SudokuBoard />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

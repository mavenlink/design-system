import React from 'react';
import renderer from 'react-test-renderer';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from './index.js';

function render() {
  return renderer.create(
    <Table>
      <TableHeader>
        <TableHeaderCell>id</TableHeaderCell>
        <TableHeaderCell>name</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Bob Ross</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Bob Marley</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
}

test('rendering', () => {
  const tree = render();
  expect(tree.toJSON()).toMatchSnapshot();
});

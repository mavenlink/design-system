import React from 'react';
import { createWrapper } from 'lib/test-utils';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from './index';

function render() {
  return createWrapper(
    <Table>
      <TableHead>
        <TableHeaderCell>id</TableHeaderCell>
        <TableHeaderCell>name</TableHeaderCell>
      </TableHead>
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
  const wrapper = render();
  expect(wrapper).toMatchSnapshot();
});

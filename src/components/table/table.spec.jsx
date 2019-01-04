import React from 'react';
import { mount } from 'enzyme';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from './index';

function render() {
  return mount(
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
  const wrapper = render();

  const headers = wrapper.find('th');
  expect(headers.map(el => el.text())).toEqual(['id', 'name']);

  const rows = wrapper.find('tbody tr');
  expect(rows.length).toEqual(2);

  const cells = wrapper.find('td');
  expect(cells.map(el => el.text())).toEqual(['1', 'Bob Ross', '2', 'Bob Marley']);
});

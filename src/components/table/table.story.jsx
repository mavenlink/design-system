import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableCell } from './index';

storiesOf('Table', module)
  .add('Default', () => (
    <Table>
      <TableHead>
        <TableCell>id</TableCell>
        <TableCell>name</TableCell>
        <TableCell>instrument</TableCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Lars</TableCell>
          <TableCell>Drums</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>James</TableCell>
          <TableCell>Guitar</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Kirk</TableCell>
          <TableCell>Guitar</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>4</TableCell>
          <TableCell>Robert</TableCell>
          <TableCell>Bass</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));

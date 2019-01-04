import PropTypes from 'prop-types';
import React from 'react';
import {
  Table as OurTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '../../../src/components/table';
import styles from './table.css';

export default function Table({ columns, rows, getRowKey }) {
  return (
    <OurTable className={styles.table}>
      <TableHeader>
        {columns.map(({ caption }) => <TableHeaderCell key={caption}>{caption}</TableHeaderCell>)}
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={getRowKey(row)}>
            {columns.map(({ caption, render }) => (
              <TableCell key={caption}>
                {render(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </OurTable>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRowKey: PropTypes.func.isRequired,
};

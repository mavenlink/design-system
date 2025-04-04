A grid cell for date field.

```jsx
import Date from '../../components/cell-control/date.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Date</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Date
        id={uuid.v4()}
        labelledBy={ids.th.example}
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Date
        id={uuid.v4()}
        labelledBy={ids.th.example}
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Date
        id={uuid.v4()}
        labelledBy={ids.th.example}
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Date
        id={uuid.v4()}
        labelledBy={ids.th.example}
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

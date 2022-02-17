A grid cell for money.

```jsx
import Money from '@mavenlink/design-system/src/components/cell-control/money.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';
import styles from './examples.css';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Money</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Money
        id={uuid.v4()}
        labelledBy={ids.th.example}
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Money
        id={uuid.v4()}
        labelledBy={ids.th.example}
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Money
        id={uuid.v4()}
        labelledBy={ids.th.example}
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Money
        id={uuid.v4()}
        labelledBy={ids.th.example}
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

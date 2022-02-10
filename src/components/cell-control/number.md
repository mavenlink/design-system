A grid cell for number.

```jsx
import Number from '@mavenlink/design-system/src/components/cell-control/number.jsx';
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
    <TableHeaderCell id={ids.th.input}>Number</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Number
        classNames={{ container: styles.numberCell }}
        id={uuid.v4()}
        labelledBy={ids.th.example}
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Number
        classNames={{ container: styles.numberCell }}
        id={uuid.v4()}
        labelledBy={ids.th.example}
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Number
        classNames={{ container: styles.numberCell }}
        id={uuid.v4()}
        labelledBy={ids.th.example}
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Number
        classNames={{ container: styles.numberCell }}
        id={uuid.v4()}
        labelledBy={ids.th.example}
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

A grid cell for large text datum.

```jsx
import Textarea from '../../components/cell-control/textarea.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Input</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Textarea labelledBy={ids.th.example} name="input" id={uuid.v4()} placeholder="Type into this cell." />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Textarea labelledBy={ids.th.example} name="input" id={uuid.v4()} readOnly value="This is not editable.\n\nWith mult-line text.\n\nWith alot of text." />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Textarea labelledBy={ids.th.example} name="input" id={uuid.v4()} placeholder="This will error after blur." required />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Textarea labelledBy={ids.th.example} name="input" id={uuid.v4()} validationMessage="This is an error message!" />
    </TableRow>
  </TableBody>
</Table>
```

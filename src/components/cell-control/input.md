A grid cell for text datum. 

```jsx
import Input from '@mavenlink/design-system/src/components/cell-control/input.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

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
      <Input labelledBy={ids.th.example} name="input" id={uuid.v4()} />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Input labelledBy={ids.th.example} name="input" id={uuid.v4()} readOnly />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Input labelledBy={ids.th.example} name="input" id={uuid.v4()} required />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Input labelledBy={ids.th.example} name="input" id={uuid.v4()} validationMessage="This is an error message!" />
    </TableRow>
  </TableBody>
</Table>
```

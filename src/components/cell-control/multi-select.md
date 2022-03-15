```jsx
import MultiSelect from '@mavenlink/design-system/src/components/cell-control/multi-select.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

const options = [
  { value: '1', label: 'Option 1' }, 
  { value: '2', label: 'Option 2' }, 
  { value: '3', label: 'Option 3' },
];

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Select</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <MultiSelect
        id={uuid.v4()}
        labelledBy={ids.th.example}
        options={options}
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <MultiSelect
        id={uuid.v4()}
        labelledBy={ids.th.example}
        options={options}
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <MultiSelect
        id={uuid.v4()}
        labelledBy={ids.th.example}
        options={options}
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <MultiSelect
        id={uuid.v4()}
        labelledBy={ids.th.example}
        options={options}
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

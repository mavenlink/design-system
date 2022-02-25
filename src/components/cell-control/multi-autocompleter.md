```jsx
import MultiAutocompleter from '@mavenlink/design-system/src/components/cell-control/multi-autocompleter.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Select</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <MultiAutocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.example}
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <MultiAutocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.example}
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <MultiAutocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.example}
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <MultiAutocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.example}
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

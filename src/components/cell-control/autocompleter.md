A grid cell for text datum.

```jsx
import Autocompleter from '@mavenlink/design-system/src/components/cell-control/autocompleter.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

const ids = {
  th: {
    autocompleter: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.input}>Autocompleter</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-1"
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-2"
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-3"
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-4"
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

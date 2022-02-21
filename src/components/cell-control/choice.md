A grid cell for single choice custom field.

```jsx
import Choice from '@mavenlink/design-system/src/components/cell-control/choice.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Single Choice</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Choice
        customFieldID="0"
        id={uuid.v4()}
        labelledBy={ids.th.example}
        name="single-choice"
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Choice
        customFieldID="0"
        id={uuid.v4()}
        labelledBy={ids.th.example}
        name="single-choice"
        readOnly
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Choice
        customFieldID="0"
        id={uuid.v4()}
        labelledBy={ids.th.example}
        name="single-choice"
        required
      />
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Choice
        customFieldID="0"
        id={uuid.v4()}
        labelledBy={ids.th.example}
        name="single-choice"
        validationMessage="This is a validation message."
      />
    </TableRow>
  </TableBody>
</Table>
```

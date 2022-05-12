A grid cell for text datum. 

```jsx
import ListOption from '@mavenlink/design-system/src/components/list-option/list-option.jsx';
import Select from '@mavenlink/design-system/src/components/cell-control/select.jsx';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@mavenlink/design-system/src/components/table';

const ids = {
  th: {
    example: uuid.v4(),
  },
};

const generateOptions = (i) => [
  { id: `select-${i}-option-1`, label: 'It', ref: React.createRef() },
  { id: `select-${i}-option-2`, label: 'is', ref: React.createRef() },
  { id: `select-${i}-option-3`, label: 'Wednesday', ref: React.createRef() },
  { id: `select-${i}-option-4`, label: 'my', ref: React.createRef() },
  { id: `select-${i}-option-5`, label: 'dudes', ref: React.createRef() },
  { id: `select-${i}-option-6`, label: 'reeeeeeee!', ref: React.createRef() },
];

const options = [
  generateOptions(1),
  generateOptions(2),
  generateOptions(3),
  generateOptions(4),
  generateOptions(5),
];

<Table>
  <TableHeader>
    <TableHeaderCell>State</TableHeaderCell>
    <TableHeaderCell id={ids.th.example}>Select</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell role="rowheader">Default</TableCell>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.example}
        listOptionRefs={options[0].map(option => option.ref)}
        name="select-1"
      >
        {({ onSelect }) => options[0].map((option, index) => (
          <ListOption key={option.id} onSelect={onSelect} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Read-only</TableCell>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.example}
        listOptionRefs={options[1].map(option => option.ref)}
        name="select-2"
        readOnly
      >
        {({ onSelect }) => options[1].map((option, index) => (
          <ListOption key={option.id} onSelect={onSelect} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Required</TableCell>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.example}
        listOptionRefs={options[2].map(option => option.ref)}
        name="select-3"
        required
      >
        {({ onSelect }) => options[2].map((option, index) => (
          <ListOption key={option.id} onSelect={onSelect} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </TableRow>
    <TableRow>
      <TableCell role="rowheader">Invalid</TableCell>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.example}
        listOptionRefs={options[3].map(option => option.ref)}
        name="select-4"
        validationMessage="This is a validation message."
      >
        {({ onSelect }) => options[3].map((option, index) => (
          <ListOption key={option.id} onSelect={onSelect} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </TableRow>
  </TableBody>
</Table>
```

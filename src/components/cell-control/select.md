A grid cell for text datum. 

```jsx
import ListOption from '@mavenlink/design-system/src/components/list-option/list-option.jsx';
import Select from '@mavenlink/design-system/src/components/cell-control/select.jsx';

const ids = {
  th: {
    select: uuid.v4(),
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

<table role="grid">
  <thead>
    <tr>
      <th>State</th>
      <th id={ids.th.select} role="columnheader" scope="col">Select</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td role="rowheader">Default</td>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.select}
        listOptionRefs={options[0].map(option => option.ref)}
        name="select-1"
      >
        {options[0].map((option, index) => (
          <ListOption key={option.id} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </tr>
    <tr>
      <td role="rowheader">Read-only</td>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.select}
        listOptionRefs={options[1].map(option => option.ref)}
        name="select-2"
        readOnly
      >
        {options[1].map((option, index) => (
          <ListOption key={option.id} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </tr>
    <tr>
      <td role="rowheader">Required</td>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.select}
        listOptionRefs={options[2].map(option => option.ref)}
        name="select-3"
        required
      >
        {options[2].map((option, index) => (
          <ListOption key={option.id} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </tr>
    <tr>
      <td role="rowheader">Invalid</td>
      <Select
        id={uuid.v4()}
        labelledBy={ids.th.select}
        listOptionRefs={options[3].map(option => option.ref)}
        name="select-4"
        validationMessage="This is a validation message."
      >
        {options[3].map((option, index) => (
          <ListOption key={option.id} ref={option.ref} value={option.label}>
            {option.label}
          </ListOption>
        ))}
      </Select>
    </tr>
  </tbody>
</table>
```

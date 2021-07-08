A grid cell for text datum. 

```jsx
import Input from '@mavenlink/design-system/src/components/cell-control/input.jsx';

const ids = {
  th: uuid.v4(),
};

<table role="grid">
  <thead>
    <tr>
      <th>State</th>
      <th id={ids.th} role="columnheader" scope="col">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td role="rowheader">Default</td>
      <Input labelledBy={ids.th} id={uuid.v4()} />
      <Input labelledBy={ids.th} id={uuid.v4()} />
    </tr>
    <tr>
      <td role="rowheader">Read-only</td>
      <Input labelledBy={ids.th} id={uuid.v4()} readOnly />
      <Input labelledBy={ids.th} id={uuid.v4()} />
    </tr>
    <tr>
      <td role="rowheader">Required</td>
      <Input labelledBy={ids.th} id={uuid.v4()} required />
      <Input labelledBy={ids.th} id={uuid.v4()} />
    </tr>
    <tr>
      <td role="rowheader">Invalid</td>
      <Input labelledBy={ids.th} id={uuid.v4()} validationMessage="This is an error message!" />
      <Input labelledBy={ids.th} id={uuid.v4()} />
    </tr>
  </tbody>
</table>
```

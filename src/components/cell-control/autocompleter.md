A grid cell for text datum.

```jsx
import Autocompleter from '@mavenlink/design-system/src/components/cell-control/autocompleter.jsx';

const ids = {
  th: {
    autocompleter: uuid.v4(),
  },
};

<table role="grid">
  <thead>
    <tr>
      <th>State</th>
      <th id={ids.th.select} role="columnheader" scope="col">Autocompleter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td role="rowheader">Default</td>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-1"
      />
    </tr>
    <tr>
      <td role="rowheader">Read-only</td>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-2"
        readOnly
      />
    </tr>
    <tr>
      <td role="rowheader">Required</td>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-3"
        required
      />
    </tr>
    <tr>
      <td role="rowheader">Invalid</td>
      <Autocompleter
        apiEndpoint='/models'
        id={uuid.v4()}
        labelledBy={ids.th.autocompleter}
        name="autocompleter-4"
        validationMessage="This is a validation message."
      />
    </tr>
  </tbody>
</table>
```

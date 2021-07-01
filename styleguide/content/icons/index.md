See `<Icon>` documentation for how to use an individual icon.

```js
import icons from './index.js';
import Icon from '@mavenlink/design-system/src/components/icon/icon.jsx';
const {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} = require('@mavenlink/design-system/src/components/table');

<Table>
  <TableHeader>
    <TableHeaderCell>Example</TableHeaderCell>
    <TableHeaderCell>Path</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {icons.map(([props, options]) => (
      <TableRow key={options.path}>
        <TableCell>
          <Icon {...props} />
        </TableCell>
        <TableCell>{options.path}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

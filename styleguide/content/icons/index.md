See `<Icon>` documentation for how to use an individual icon.

```js
import icons from './index.js';
import Icon from '../../../src/components/icon/icon.jsx';
const {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} = require('../../../src/components/table/index.js');

<Table>
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Example</TableHeaderCell>
    <TableHeaderCell>Prop: `currentColor`</TableHeaderCell>
    <TableHeaderCell>Prop: `fill`</TableHeaderCell>
    <TableHeaderCell>Prop: `stroke`</TableHeaderCell>
    <TableHeaderCell>Prop: `size`</TableHeaderCell>
    <TableHeaderCell>Path</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {icons.map(([props, options]) => (
      <TableRow>
        <TableCell>{props.name}</TableCell>
        <TableCell>
          <Icon {...props} />
        </TableCell>
        <TableCell>{props.currentColor}</TableCell>
        <TableCell>{props.fill}</TableCell>
        <TableCell>{props.stroke}</TableCell>
        <TableCell>{props.size}</TableCell>
        <TableCell>{options.path}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

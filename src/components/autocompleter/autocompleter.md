The `Autocompleter` component is a wrapper for Select component with the additional functionality searching for a specific models from an API endpoint.

For a11y and additional prop info, see the `Select` component.

### Default examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint='/models' id='ex-1' name='default-ex' label='Default Example' />
```

### Initial value examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint='/models' value={{id: 11, name: 'cool'}} id='ex-2' name='value-ex' label='Value Example' />
```

## Ref API Example
```jsx
import Autocompleter from './autocompleter.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Autocompleter ref={ref} onChange={onChange} apiEndpoint='/models' id='ex-3' name='ref-ex' label='Ref Example'  />
  )}
</RefExample>
```

This component makes it easy to fetch data from the Mavenlink API and render it with the Select component.

### Default examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint='/models' id={uuid.v4()} name='default-ex' label='Default Example' />
```

### Initial value examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint='/models' value={11} id={uuid.v4()} name='value-ex' label='Value Example' />
```

## Ref API Example with children
```jsx
import Autocompleter from './autocompleter.jsx';
import RefExample from '@mavenlink/design-system/src/components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();
const modelComponent = (props) => {
  return (
    <h1>children: {props.name}</h1>
  );
};

<RefExample ref={ref}>
  {({ onChange }) => (
    <Autocompleter apiEndpoint='/models' id={uuid.v4()} name='children-ex' label='Children Example' onChange={onChange} ref={ref}>
      { modelComponent }
    </Autocompleter>
  )}
</RefExample>
```

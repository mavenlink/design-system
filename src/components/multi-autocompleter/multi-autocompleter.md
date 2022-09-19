## Basic Usage
```jsx
import MultiAutocompleter from '../../components/multi-autocompleter/multi-autocompleter.jsx';

<MultiAutocompleter apiEndpoint='/models' id='example-1' name='example' label='MultiAutocompleter Basic Usage Example' value={[{
    id: '55',
    name: 'Foo',
  }]}
/>
```

## Ref API Example
```jsx
import MultiAutocompleter from '../../components/multi-autocompleter/multi-autocompleter.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MultiAutocompleter ref={ref} onChange={onChange} apiEndpoint='/models' id='example-1' name='example' label='MultiAutocompleter Ref Example'  />
  )}
</RefExample>
```

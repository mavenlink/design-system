## Ref API Example
```jsx
import MultiAutocompleter from './multi-autocompleter.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MultiAutocompleter ref={ref} onChange={onChange} apiEndpoint='/models' id='ex-1' name='ref-ex' label='Ref Example'  />
  )}
</RefExample>
```

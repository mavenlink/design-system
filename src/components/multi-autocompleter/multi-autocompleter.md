## Basic Usage
```jsx
import MultiAutocompleter from '@mavenlink/design-system/src/components/multi-autocompleter/multi-autocompleter.jsx';

<MultiAutocompleter apiEndpoint='/farts' id='example-1' name='example' label='MultiAutocompleter Basic Usage Example'  />
```

## Ref API Example
```jsx
import MultiAutocompleter from '@mavenlink/design-system/src/components/multi-autocompleter/multi-autocompleter.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MultiAutocompleter ref={ref} onChange={onChange} apiEndpoint='/models' id='example-1' name='example' label='MultiAutocompleter Ref Example'  />
  )}
</RefExample>
```

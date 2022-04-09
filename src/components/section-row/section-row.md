`SectionRow`s are designed to complement `Section`s, allowing a design-spec approach to a "table-like" to component layout. They use specific spacing between child components. They should only be used as containers, and within a `Section` component.

```js
import Section from '@mavenlink/design-system/src/components/section/section.jsx';
import Input from '@mavenlink/design-system/src/components/input/input.jsx';

<Section
  title="Project Details"
  description="These fields allow control of custom project fields."
>
  <SectionRow>
    <Input
      id={uuid.v4()}
      label="Project Sub Name"
    />
    <Input
      id={uuid.v4()}
      label="Project Direct Report"
    />
  </SectionRow>
</Section>
```

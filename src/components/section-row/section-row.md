`SectionRow`s are designed to complement `Section`s, allowing a design-spec approach to a "table-like" to component layout. They use specific spacing between child components. They should only be used as containers, and within a `Section` component.

```
<Section
  title="Project Details"
  description="These fields allow control of custom project fields."
>
  <SectionRow>
    <CustomFieldInputText
      id="test-id-1"
      label="Project Sub Name"
    />
    <CustomFieldInputText
      id="test-id-2"
      label="Project Direct Report"
    />
  </SectionRow>
</Section>
```

Sections can be used to semantically group controls, information, and inputs. Sections get the `region` ARIA role by default, and the `title` prop is required to support accessibility with a contained heading. For now, the section component should only be used in Custom Apps, while the "page layout" spec is still in flux.

```
<Section
  title="I am a section"
  description="Test description"
/>
```

Sections can contain child elements, like any other element:
```
<Section
  title="Project Details"
  description="These fields allow control of custom project fields."
>
  <CustomFieldInputText
    id="test-id-1"
    label="Project Sub Name"
  />
  <CustomFieldInputText
    id="test-id-2"
    label="Project Direct Report"
  />
</Section>
```

Sections can be siblings with proper spacing, and with things like form submission containers:
```
<Section
  title="Top Section"
  description="This is the top section."
/>
<Section
  title="Bottom Section"
  description="This is the bottom section."
/>
<div>
  <Button color="primary">Save</Button>
  <Button color="secondary">Cancel</Button>
</div>
```

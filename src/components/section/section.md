`Section`s can be used to semantically group controls, information, and inputs. `Section`s get the `region` ARIA role by default, and the `title` prop is required to support accessibility with a contained heading. For now, the `Section` component should only be used in Custom Apps, while the "page layout" spec is still in flux.

For rows that should contain more than one full-length component, a `SectionRow` should be used to wrap thse children.

```js
<Section
  title="I am a section"
  description="Test description"
/>
```

`Section`s can contain child elements, like any other element:

```js
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import SectionRow from '../section-row/section-row.jsx';

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
  <SectionRow>
    <CustomFieldInputText
      id="test-id-3"
      label="Project Sub Report 1"
    />
    <CustomFieldInputText
      id="test-id-4"
      label="Project Sub Report 2"
    />
  </SectionRow>
</Section>
```

`Section`s can be siblings with proper spacing, and with things like form submission containers:

```js
import Button from '../button/button.jsx';

<React.Fragment>
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
</React.Fragment>
```

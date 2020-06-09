The `CustomFieldInputMultipleChoice` component represents the UI for a custom field of type multi choice from Mavenlink's API.

### Default examples

```jsx
<CustomFieldInputMultipleChoice
  value={[
    { id: '1', label: 'First Choice' },
    { id: '2', label: 'Second Choice' },
    { id: '3', label: 'Third Choice' },
  ]}
/>
```

### Read-only examples

```jsx
<CustomFieldInputMultipleChoice
  readOnly
  value={[
    { id: '1', label: 'First Choice' },
    { id: '2', label: 'Second Choice' },
    { id: '3', label: 'Third Choice' },
  ]}
/>
```

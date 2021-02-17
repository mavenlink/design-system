The `CustomFieldInputMultipleChoice` component represents the UI for a custom field of type multi choice from Mavenlink's API.
Its accessibility interactions are inherited from [`TagList`](#/Components/TagList) and [`Tag`](#/Components/Tag) components.

### Examples

```js
const choices = [
  { id: 1, label: 'First Choice' },
  { id: 2, label: 'Second Choice' },
  { id: 3, label: 'Third Choice' },
];

<CustomFieldInputMultipleChoice
  choices={choices}
  id="example-empty"
  label="This custom field is empty"
  name="example-empty"
  placeholder="This is an empty multi-choice field"
/>
```

```js
const choices = [
  { id: 1, label: 'First Choice' },
  { id: 2, label: 'Second Choice' },
  { id: 3, label: 'Third Choice' },
];

<CustomFieldInputMultipleChoice
  choices={choices}
  id="example-readonly"
  label="This custom field is read-only"
  name="example-readonly"
  readOnly
  value={choices.slice(0, 2)}
/>
```

```js
const choices = [
  { id: 1, label: 'First Choice' },
  { id: 2, label: 'Second Choice' },
  { id: 3, label: 'Third Choice' },
];

<CustomFieldInputMultipleChoice
  choices={choices}
  errorText="If you're not first, you're last!"
  id="example-invalid"
  label="This custom field is invalid"
  name="example-invalid"
  value={[choices[1]]}
/>
```

```js
const choices = [
  { id: 1, label: 'command (abstract role)' },
  { id: 2, label: 'composite (abstract role)' },
  { id: 3, label: 'input (abstract role)' },
  { id: 4, label: 'landmark (abstract role)' },
  { id: 5, label: 'range (abstract role)' },
  { id: 6, label: 'roletype (abstract role)' },
  { id: 7, label: 'section (abstract role)' },
  { id: 8, label: 'sectionhead (abstract role)' },
  { id: 9, label: 'select (abstract role)' },
  { id: 10, label: 'structure (abstract role)' },
  { id: 11, label: 'widget (abstract role)' },
  { id: 12, label: 'window (abstract role)' },
  { id: 13, label: 'alert (widget role)' },
  { id: 14, label: 'alertdialog (widget role)' },
  { id: 15, label: 'button (widget role)' },
  { id: 16, label: 'checkbox (widget role)' },
  { id: 17, label: 'dialog (widget role)' },
  { id: 18, label: 'gridcell (widget role)' },
  { id: 19, label: 'link (widget role)' },
  { id: 20, label: 'log (widget role)' },
  { id: 21, label: 'marquee (widget role)' },
  { id: 22, label: 'menuitem (widget role)' },
  { id: 23, label: 'menuitemcheckbox (widget role)' },
  { id: 24, label: 'menuitemradio (widget role)' },
  { id: 25, label: 'option (widget role)' },
  { id: 26, label: 'progressbar (widget role)' },
  { id: 27, label: 'radio (widget role)' },
  { id: 28, label: 'scrollbar (widget role)' },
  { id: 29, label: 'slider (widget role)' },
  { id: 30, label: 'spinbutton (widget role)' },
  { id: 31, label: 'status (widget role)' },
  { id: 32, label: 'tab (widget role)' },
  { id: 33, label: 'tabpanel (widget role)' },
  { id: 34, label: 'textbox (widget role)' },
  { id: 35, label: 'timer (widget role)' },
  { id: 36, label: 'tooltip (widget role)' },
  { id: 37, label: 'treeitem (widget role)' },
  { id: 38, label: 'combobox (composite role)' },
  { id: 39, label: 'grid (composite role)' },
  { id: 40, label: 'listbox (composite role)' },
  { id: 41, label: 'menu (composite role)' },
  { id: 42, label: 'menubar (composite role)' },
  { id: 43, label: 'radiogroup (composite role)' },
  { id: 44, label: 'tablist (composite role)' },
  { id: 45, label: 'tree (composite role)' },
  { id: 46, label: 'treegrid (composite role)' },
  { id: 47, label: 'article (structure role)' },
  { id: 48, label: 'columnheader (structure role)' },
  { id: 49, label: 'definition (structure role)' },
  { id: 50, label: 'directory (structure role)' },
  { id: 51, label: 'document (structure role)' },
  { id: 52, label: 'group (structure role)' },
  { id: 53, label: 'heading (structure role)' },
  { id: 54, label: 'img (structure role)' },
  { id: 55, label: 'list (structure role)' },
  { id: 56, label: 'listitem (structure role)' },
  { id: 57, label: 'math (structure role)' },
  { id: 58, label: 'note (structure role)' },
  { id: 59, label: 'presentation (structure role)' },
  { id: 60, label: 'region (structure role)' },
  { id: 61, label: 'row (structure role)' },
  { id: 62, label: 'rowgroup (structure role)' },
  { id: 63, label: 'rowheader (structure role)' },
  { id: 64, label: 'separator (structure role)' },
  { id: 65, label: 'toolbar (structure role)' },
  { id: 66, label: 'application (landmark role)' },
  { id: 67, label: 'banner (landmark role)' },
  { id: 68, label: 'complementary (landmark role)' },
  { id: 69, label: 'contentinfo (landmark role)' },
  { id: 70, label: 'form (landmark role)' },
  { id: 71, label: 'main (landmark role)' },
  { id: 72, label: 'navigation (landmark role)' },
  { id: 73, label: 'search (landmark role)' },
];

const value = [
  choices[3],
  choices[13],
  choices[21],
  choices[27],
  choices[33],
  choices[49],
];

<CustomFieldInputMultipleChoice
  choices={choices}
  id="example-lotsa"
  label="This custom field has a lot of choices"
  name="example-lotsa"
  value={value}
/>
```

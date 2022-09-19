The `TagList` component encompasses the design and accessibility requires for a list of tags.
It is designed to take arbitirary nested components.
It only requires a few things to get it working:

1. A list of `ref`s which each individual `ref` is passed into a tag
1. Events are propagated to the `TagList` to handle interactions

### Accessibility

This component's accessibility was built using the [WAI ARIA example for a layout grid](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

### Labeling

The TagList is a grid widget.
Each individual tag is a row.
A tag can be made up of many grid cells.
This ensures screen readers can know:

1. How many tags are in the list
1. Which tag has focus
1. Which element in a tag has focus

#### Interactions

| Key | State | Interaction |
| --- | --- | --- |
| Left / Up Arrrow | --- | Moves the focus to the previous tag |
| Right / Down Arrrow | --- | Moves the focus to the next tag |
| Home | --- | Moves the focus to the first tag |
| End | --- | Moves the focus to the last tag |

1. The focus does not wrap around a tag list
1. There is only 1 active tag in the page tab sequence
1. Clicking on a tag will focus the tag

### Example

```js
import FormControl from '../../components/form-control/form-control.jsx';
import Tag from '../../components/tag/tag.jsx';

const data = [
  'Molotov Solution',
  'Band Name',
];
const refs = data.map(() => React.createRef());
const tagListId = 'basic-example';

<FormControl
  id={`tag-list-example-${tagListId}`}
  label="Band names"
  labelId="tag-list-example-1"
>
  <TagList id={tagListId} labelledBy="tag-list-example-1" refs={refs}>
    {data.map((datum, index) => (
      <Tag
        defaultActive={index === 0 ? true : false}
        id={`${tagListId}-${index}`}
        key={`tag-${index}`}
        ref={refs[index]}
      >
        {datum}
      </Tag>
    ))}
  </TagList>
</FormControl>
```

### Wrapping example

```js
import FormControl from '../../components/form-control/form-control.jsx';
import Tag from '../../components/tag/tag.jsx';

const data = [
  'command (abstract role)',
  'composite (abstract role)',
  'input (abstract role)',
  'landmark (abstract role)',
  'range (abstract role)',
  'roletype (abstract role)',
  'section (abstract role)',
  'sectionhead (abstract role)',
  'select (abstract role)',
  'structure (abstract role)',
  'widget (abstract role)',
  'window (abstract role)',
  'alert (widget role)',
  'alertdialog (widget role)',
  'button (widget role)',
  'checkbox (widget role)',
  'dialog (widget role)',
  'gridcell (widget role)',
  'link (widget role)',
  'log (widget role)',
  'marquee (widget role)',
  'menuitem (widget role)',
  'menuitemcheckbox (widget role)',
  'menuitemradio (widget role)',
  'option (widget role)',
  'progressbar (widget role)',
  'radio (widget role)',
  'scrollbar (widget role)',
  'slider (widget role)',
  'spinbutton (widget role)',
  'status (widget role)',
  'tab (widget role)',
  'tabpanel (widget role)',
  'textbox (widget role)',
  'timer (widget role)',
  'tooltip (widget role)',
  'treeitem (widget role)',
  'combobox (composite role)',
  'grid (composite role)',
  'listbox (composite role)',
  'menu (composite role)',
  'menubar (composite role)',
  'radiogroup (composite role)',
  'tablist (composite role)',
  'tree (composite role)',
  'treegrid (composite role)',
  'article (structure role)',
  'columnheader (structure role)',
  'definition (structure role)',
  'directory (structure role)',
  'document (structure role)',
  'group (structure role)',
  'heading (structure role)',
  'img (structure role)',
  'list (structure role)',
  'listitem (structure role)',
  'math (structure role)',
  'note (structure role)',
  'presentation (structure role)',
  'region (structure role)',
  'row (structure role)',
  'rowgroup (structure role)',
  'rowheader (structure role)',
  'separator (structure role)',
  'toolbar (structure role)',
  'application (landmark role)',
  'banner (landmark role)',
  'complementary (landmark role)',
  'contentinfo (landmark role)',
  'form (landmark role)',
  'main (landmark role)',
  'navigation (landmark role)',
  'search (landmark role)',
];

const refs = data.map(() => React.createRef());
const tagListId = 'wrapping-example';

<FormControl
  id={`tag-list-example-${tagListId}`}
  label="ARIA roles"
  labelId="tag-list-example-2"
>
  <TagList id={tagListId} labelledBy="tag-list-example-2" refs={refs}>
    {data.map((datum, index) => (
      <Tag
        defaultActive={index === 0 ? true : false}
        id={`${tagListId}-${index}`}
        key={`tag-${index}`}
        ref={refs[index]}
      >
        {datum}
      </Tag>
    ))}
  </TagList>
</FormControl>
```

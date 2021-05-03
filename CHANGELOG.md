## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

  - Major/Minor/Patch: This is an example changelog item, usually can be the commit message.
  - Append new items to make git merging easier.
  - feat(FormControlIcons): Add `FormControlIcons` component
  - feat(Percentage): Add new `Percentage` component
</details>

## v0.67.0
- feat(popover): The popover now supports flushing to the left or right. It defaults to left.
- feat(popover): The popover can now automatically determine which direction to flush in. It defaults to the direction provided (or left, if unprovided).
- fix(popover): The popover no longer forcefully scrolls the close icon into view when it opens.

## v0.66.0
- feat(Date): implement Date component
- refactor(CustomFieldInputDate): use new Date component as presentational layer

## v0.65.0
  - feat(Textarea): Implement new `Textarea` component, with new mock handlers in styleguidist
  - fix(Select): When required, the select should not show error text on initial render

## v0.64.1
- fix(select): Only shows errors after blur

## v0.64.0
- feat(design-patterns): add various page patterns: table, form, hybrid

## v0.63.1
- fix(custom-field-input-date): does not offset value when a date with time info is given with the timezone

## v0.63.0
- feat(CustomFieldInputMultipleChoice): add self-loading of choices with customFieldID prop
- BREAKING CHANGE(CustomFieldMultipleChoice): removed choices from the props API
- patch(CustomFieldInput*Choice): fix mock handlers and unnecessary data munging
- patch(MSW): Fix mock handlers format for custom field choices

## v0.62.1
- Patch: Ensure MDS inputs use MDS fonts
- Patch: Ensure MDS inputs have a height of 32px

## v.0.62.0
  - Minor: Make `CustomFieldInputSingleChoice` use the `Loader` component while loading, placed inside the choices dropdown
  - Major: Move `CustomFieldInputSingleChoice` mock handlers to function format to support delay

## v0.61.0
  - Major: Add self-loading of choices to `CustomFieldSingleChoice`
  - Major: Remove `choices` from props API of `CustomFieldSingleChoice`
  - Minor: Add `customFieldID` prop to `CustomFieldSingleChoice`
  - Major: Change `value` prop of `CustomFieldSingleChoice` to accept an array of IDs
  - Minor: Bugfix for `ListOption` to change class based on selected state, not selected prop only

## v0.60.0
- feature(custom-field-input-multiple-choice): Implement `className` API
- fix(custom-field-input-multiple-choice): Ensure read-only styled combobox has same background as the tag-list
- feature(custom-field-input-multiple-choice): implement `placeholder` API
- feature(custom-field-input-multiple-choice): implement `required` API

## v0.59.1
  - Patch: `undefined` coerces to `null` to avoid browser warnings when clearing Number component's input 

## v0.59.0
  - Major: `ref.value` for CustomFieldInputNumber now returns its type as Integer. To upgrade replace value with String(value)

## v0.58.0
  - Minor: Implement updatable `value` API on Select component
  - Minor: Implement updatable `value` API on CustomFieldInputSingleChoice component
  - Minor: Replace `useDidMount` (state update) with `useMounted` (ref)

## v0.57.0
  - Major: Remove margin from `PageHeader`: Add wrapper around `PageHeader` and implement `--spacing-x-large` margin
  - Minor: Add `className` API to `PageHeader`

## v0.56.1
  - Patch: Ensure date input does not overflow under the calendar icon

## v0.56.0
  - Minor: feature(CustomFieldInputDate): rerender based on `value` prop
  - Major: feature(CustomFieldInputDate): replace `disabled` prop with `readOnly` prop

## v0.55.0
  - Minor: Add new `buttonContainerClassName` API to `Form` component

## v0.54.0
  - Patch: Ensure Currency component can update its value given new `value` prop
  - Minor: Add `onChange` prop to CustomFieldInputText component
  - Minor: Add `onChange` prop to CustomFieldInputNumber component
  - Minor: Add `onChange` prop to CustomFieldInputCurrency component

## v0.53.3
  - Patch: Fix styling bug concerning save button on Form component

## v0.53.2
  - Patch: Make `title` prop no longer required for `Section`

## v0.53.1
  - Patch: Specific imports for the `Popover` documentation

## v0.53.0
  - Minor: Add new `Popover` component

## v0.52.2
  - Patch: Fix issue with custom field input date in Safari, Firefox

## v0.52.1
  - Remove debounce functionality from form component when `autoSave` is set to true

## v0.52.0
  - Major: Create new `Number` component and integrate it with `CustomFieldInputNumber`

## v0.51.3
  - Patch: Update documentation to match typography subheads specs
  - Patch: Update documentation to download Open Sans 400 and 600 fonts

## v0.51.2
  - Patch: Fix keydown events in `TagList` from child `Input` being consumed and cancelled

## v0.51.1
  - Patch: Ensure `Calendar` day headings are center aligned

## v0.51.0
  - Minor: Add `setTabActiveStates` to `Tag` component ref API
  - Patch: Use new `setTabActiveStates` in `TagList` component to set the correct active child when using keyboard nav

## v0.50.0
  - Major: Deprecate unused props API on `CustomFieldInputText`: `ariaProps.autocomplete`, `ariaProps.haspopup`, `disabled`, `onBlur`, `onChange`, `onClick`, `onKeyDown`, `onKeyUp`
  - Major: Deprecate `defaultValue` prop API on `CustomFieldInputText` in favor of `value`
  - Major: Deprecate `disabled` prop API on `CustomFieldInputCurrency`
  - Minor: Enhance `Input` component with validation logic, ref API
  - Patch: Fix a11y descriptions for `Input` component
  - Major: Deprecate unused props API `Input`: `invalid`, `defaultValue`

## v0.49.0
  - Minor: Add `autoComplete` prop to `AbstractCustomField`
  - Minor: Set `autoComplete="off"` for `Select` component
  - Minor: Call `Listbox#onChange` with re-selections, ensure `Select` options are closed when already selected
  - Patch: Turn off autofill behavior in `CustomFieldInputMultipleChoice`

## v0.48.2
  - Minor: Add Toggle Code button to all component examples in order to better accessibility QA
  - Patch: Fix timezone issue with `CustomFieldInputDate`

## v0.48.1
  - Patch: Fix bug where `Select` and `CustomFieldInputString` showed errors on first render when html invalid.
  - Patch: `Select`, `CustomFieldInputSingleChoice` maintains correct input value state when closing dropdown
  - Patch: `Form` now checks for `ref.current` before invoking debounced onSubmit callback

## v0.48.0
  - Minor: Implement `Form#autoSave` prop API

## v0.47.0
  - Minor: `CustomFieldInputDate` supports placeholder, truncates month to 3 characters, and uses Open Sans
  - Minor: `Calendar` no longer triggers a selection on year view change
  - Major: Deprecate `inputRef` on CustomFieldInputNumber
  - Fix Icon: apply `id` to title element for correct labelledBy behavior
  - Fix IconButton: apply `id` to title element for correct labelledBy behavior

## v0.46.1
  - Patch: Explicitly set `FormControl` label to `display: inline`
  - Patch: Use the correct MDS color for the "(Required)" part of `FormControl` labels

## v0.46.0
  - Major: Deprecate `inputRef` on CustomFieldInputNumber

## v0.45.0
  - Minor: Add maxLength attribute support to text and abstract custom fields

## v0.44.1
  - Patch: Import Select component in documentation

## v0.44.0
  - Patch: Update PageHeader typography to match MDS specs
  - Minor: Add new `Select` component
  - Minor: Refactor `CustomFieldInputSingleChoice` to use `Select`
  - Minor: Add new `setSelected` and `setVisible` methods to `ListOption` ref API

## v0.43.3
  - Minor: Add submitText prop to Form

## v0.43.2
  - Patch: Custom Field Date Input's onChange callback references ref as its target

## v0.42.1
  - Patch: Fix documentation for Form

## v0.42.0
  - Minor: Add `className` and `classNameReadOnly` to `Tag` component API
  - Minor: Fix styling for input of `CustomFieldMultipleChoice` component
  - Minor: Custom Field Date Input is editable and uses the Calendar component
  - Patch: Perform simple refactor to avoid react re-rendering issue on `CustomFieldInputMultipleChoice`
  - Major: Invoke `CustomFieldInputMultipleChoice` `onChange` prop with an event-like object shape
    Upgrade: The reference to the component is nested in the `target` key: `(event) => event.target`
  - Major: Invoke `CustomFieldInputSingleChoice` `onChange` prop with an event-like object shape
    Upgrade: The reference to the component is nested in the `target` key: `(event) => event.target`
  - Minor: Implement `dirty` ref APIs on custom field components
  - Minor: Implement `name` prop APIs on custom field components
  - Minor: Implement `Form` component

## v0.41.0
  - Major: Deprecate Icon v1 API: size, currentColor, fill, name, title
  - Major: Implement Icon v2 API: icon, label
  - Major: Replace SVGs with self-contained SVGS -- embedded size and colors

## v0.40.0 (September 3, 2020)
  - Minor: Add `defaultValue` to `Input` component API

## v0.39.3 (September 1, 2020)
  - Minor: Spacing linter to ensure values that can be MDS spacing variables are.
  - Minor: Calendar component dates can be navigated via keyboard
  - Minor: Calendar component year dropdown allows selecting a year

## v0.38.0 (August 25, 2020)
  - Minor: Add `forwardRef` and `onChange` APIs to `CustomFieldInputMultipleChoice`
  - Patch: Don't coerce ref value for `CustomFieldInputSingleChoice` to a number anymore (it already is now)
  - Minor: Adjust styling between sections for section component

## v0.37.0 (August 25, 2020)
- Minor: Promote Loader component from internal MDS to external MDS
- Minor: Add documentation explaining how to promote a component
- Minor: Adjust styling between sections for section component

## v0.36.2 (August 21, 2020)
- Patch: Adjust styling between sections for section component

## v0.36.1 (August 7, 2020)
- Patch: Brand Identity information is now displayed across a few different pages

## v0.36.0 (August 6, 2020)
- Minor: Implement static `Calendar` component
- Minor: Implement `Icon` v2 API
- Minor: Implement `IconButton` component

## v0.35.0 (August 5, 2020)
- Major: CustomFieldInputSingleChoice's `value` on `ref` is now an array containing the `id` of the chosen option
  - Upgrading: ensure that areas of code using `value` expect this new format
- Patch: Fix a bug in `CustomFieldInputSingleChoice` related to differing number of `useRef` calls between renders
- Minor: Add `className` prop to `CustomFieldInputSingleChoice`
- Minor: Add `onChange` function prop to `CustomFieldInputSingleChoice`
- Minor: `CustomFieldInputSingleChoice` and `CustomFieldInputMultipleChoice` accessibility improvements.

## v0.34.0 (July 27, 2020)
- Minor: Add colors v1 -> v2 upgrade guide for pre-existing Mavenlink code

## 0.33.0 (July 22, 2020)
- Minor: `CustomFieldInputSingleChoice` and `CustomFieldInputMultipleChoice` now indicates to the user when no options are available
- Minor: Add `NoOptions` component to indicate a lack of options for single and multi choice custom fields

## 0.32.0 (July 22, 2020)
- Major: CustomFieldInputText has a `ref` prop with a ref API for `value`
  - Upgrading: pass a `ref` to the component
- Major: CustomFieldInputNumber has a `ref` prop with a ref API for `value`
  - Upgrading: pass a `ref` to the component
- Major: CustomFieldInputNumber's `value` prop no longer accepts an empty string
    - Upgrade path: whenever you are passing an empty string to the `value` prop, change it to `undefined`
- Major: CustomFieldInputCurrent has a ref prop with a ref API for `value`
  - Upgrading: pass a `ref` to the component

## 0.31.0 (July 20, 2020)
- Major: All custom fields now use a single `errorText` prop to determine error state
- Minor: Update `CustomFieldInputMultipleChoice` and `CustomFieldInputMultipleChoice` to close dropdown on click, escape and tab

## 0.30.0 (July 16, 2020)
- Minor: Update `CustomFieldInputSingleChoice` to allow removing selected choices

## 0.29.0 (July 15, 2020)
- Minor: Update `CustomFieldInputSingleChoice` to select choices provided via props
- Minor: Update `CustomFieldInputSingleChoice` to allow searching and filtering on provided choices
- Minor: Update `CustomFieldInputMultipleChoice` to select choices and deselect choices
- Minor: Update `CustomFieldInputMultipleChoice` to autocomplete choices
- Minor: Update `Icon` with `onClick` prop API
- Minor: Update `CustomFieldInputMultipleChoice` to remove all selected choices

## 0.28.0 (July 02, 2020)
- Minor: Publish all files in repo to NPM.
- Minor: Adjust typography table to more clearly display MDS variable names

## 0.27.0 (June 23, 2020)
- Minor: Forward refs to `Button`

## 0.26.0 (June 22, 2020)
- Minor: Implement `FormControl` component
- Major: Use `FormControl` for `Input`, `CustomFieldInputText`, , `CustomFieldInputNumber`, `CustomFieldInputCurrency`, `CustomFieldInputDate`, `CustomFieldInputSingleChoice`
- Major: Use `FormControl` for `CustomFieldInputMultipleChoice`
- Minor: Add `labelId` API to `FormControl`
- Minor: Create Listbox component
- Minor: Create ListOption component

## 0.25.0 (June 18, 2020)
- Minor: Add className to TagList component
- Minor: Set tag heights to 22px instead of auto-fitting to content
- Minor: Add id API to TagList component
- Minor: Implement CustomFieldInputMultipleChoice component
- Patch: Remove unused ref API on CustomFieldInputMultipleChoice component
- Major: Add flex-basis on direct children of SectionRow component

## 0.24.0 (June 16, 2020)
- Minor: Add linter for Typography

## 0.23.0 (June 11, 2020)
- Major: remove unnecessary styling (inline-block and vertical alignment) on Icon component
- Minor: Create the page patterns page.
- Minor: Implement PageHeader component
- Minor: Implement Tag and TagSkill components
- Minor: Add ariaLabel to Icon props
- Minor: Add ariaLabelledBy to Icon props
- Minor: Add id to Icon props
- Minor: Add `defaultActive` prop to Tag
- Minor: Implement TagList component
- Minor: Add typography-v2 CSS variables

## 0.22.0 (May 22, 2020)
- Minor: Publish site files with MDS module

## 0.21.0 (May 21, 2020)
- Minor: Add Section component
- Minor: Add SectionRow component
- Minor: Implement PageHeader component
- Patch: Fix icon alignment bug on custom field inputs

## 0.20.3 (May 15, 2020)
- Patch: Fix MDS colors with incorrect transparency

## 0.20.2 (May 15, 2020)
- Minor: Create linter for new MDS colors
- Minor: Update documentation concerning new linter
- Patch: Fix linter errors in MDS repo

## 0.20.1 (May 13, 2020)
- Minor: Update color documentation to newest version

## 0.20.0 (May 13, 2020)
- Major: Icon component does not always apply `icon-base` to the SVGs -- please compose from its stylesheet.
- Patch: Custom field inputs expand to meet their layout container widths.
- Patch: Custom field date input has a nicer calendar icon.
- Minor: Custom field input single-choice component is implemented
- Patch: Custom field input single-choice component's SVGs are updated

## 0.19.2 (May 7, 2020)
- Fix documentation for currency component to show internal error state

## 0.19.1 (May 4, 2020)
- Patch: Replace old calendar icon with new one provided by Design
- Patch: Fix read-only currency component: do not enter edit mode on focus
- Patch: Fix disabled currency component: do not enter edit mode on focus

## 0.19.0 (April 20, 2020)
- Modify the CustomFieldInputCurrency value API to only accept subunit values of the currency

## 0.18.0 (April 8, 2020)
- Add readOnly prop to CustomFieldInputCurrency and CustomFieldInputNumber

## 0.17.0 (April 7, 2020)
- Add readonly prop for text and currency

## 0.16.0 (March 25, 2020)
- Implements a readonly date component

## 0.15.0 (March 16, 2020)
- Implements a custom field currency component

## 0.14.0 (February 19, 2020)
- Implements a custom field number component

## 0.13.0 (February 17, 2020)
- Implement a text input field designed for custom forms

## 0.9.0 (July 24, 2019)
- Implements <Button /> component. At the moment, we only introduce two kinds of buttons as a means of minimizing the breadth of our supported components.

## 0.8.0 (July 18, 2019)
- Deprecate color variables without `-base`
- Add missing palette color variables

## 0.7.0 (March 15, 2019)
- Backfill spacing variable into Input and Table components
- Continuous Github pages deployment

## 0.6.0 (February 26, 2019)
- Google Analytics added
- Adds Hero Illustrations to Overview, Components, Guidelines, and Soul
- Spacing definitions added

## 0.5.0 (January 9, 2019)
- Adds the hover colors to color.css

## 0.4.0 (January 4, 2019)
- Implement our own Webpack configuration for the styleguide, the result of which is all stylesheets have had `.module` removed from the filenames.

## 0.3.0 (December 29, 2018)
- Rename stylesheets to match *.module.css, so that react-scripts will process them as CSS modules
- Fallback to the system-ui font if Open Sans isn't present

## 0.2.1 (December 19, 2018)
- Remove unnecessary right border from last table header cell
- Remove the requirement for table cells to have children

## 0.2.0 (December 18, 2018)
- Add TableHeaderCell component

## 0.1.3 (December 18, 2018)
- Tweaked styling of tables

## 0.1.2 (December 17, 2018)
- Adjusted package configuration to prevent unnecessary files from being published

## 0.1.1 (December 17, 2018)
- Fixed package configuration

## 0.1.0 (December 17, 2018)
- Added initial Input component
- Added initial Table component

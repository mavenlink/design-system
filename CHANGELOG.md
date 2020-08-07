## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

  - Major/Minor/Patch: This is an example changelog item, usually can be the commit message.
  - Append new items to make git merging easier.
  - Patch: Brand Identity information is now displayed across a few different pages
  - Minor: Implement static `Calendar` component
  - Minor: Implement `Icon` v2 API
  - Minor: Implement `IconButton` component
</details>

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

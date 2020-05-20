## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

  - Minor: Implement PageHeader component
</details>

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

We use color across our application to indicate a wide range of important things to our users: status, errors and warnings, project types, scheduled and allocated hours, etc. In order to make our application look unified, stay on brand, and ensure design consistency now and in the future, we have created a set color palette we use in all areas of our site. These are the colors which Product Design should be using in their mocks, and they are the colors Engineers should be using when building out new features or updating pages.

### Design Tokens

In order to enable good communication between Design and Engineering, we represent each color here with the same CSS variable (“design token”) we use in the codebase. Engineers should use these variables when adding color to page elements rather than hard-coding hex or RGB color values. This will assist with creating a consistent look to our site now, and will greatly help us in the future if we should ever need to update a color, as we will only have to change it in one place, rather than make a lot of individual updates across the application.

### Transparency

We manage a very small set of “base” colors, with related colors being transparencies of the parent. We represent the “base” color with a value of 100 (eg. ‘Red 100’), and transparencies of that color are named by the percentage of opacity (eg. ‘Red 54’ is equivalent to Red 100 with a 54% opacity). We use this type of palette so that we are technically only managing a small set of colors and can update them easier if needed. If there are ever any challenges or specific issues related to using a transparent color in practice, please inform your team’s designer or Web Infrastructure.

## Usage

```css
@import '@mavenlink/design-system/src/styles/colors-v2.css';

.example {
    background-color: var(--mds-blue-54);
}
```

### Brand Colors
<div class="color-container">
  <div class="dark-contrast" style="background-color: var(--mds-brand-text);">Brand Text</div>
  <div class="dark-contrast" style="background-color: var(--mds-brand-100);">Brand 100</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-54);">Brand 54</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-38);">Brand 38</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-12);">Brand 12</div>
</div>

### Base Colors
<div class="color-container">
  <div class="light-contrast" style="background-color: var(--white)">White</div>
  <div class="dark-contrast" style="background-color: var(--black)">Black</div>
  <div class="dark-contrast" style="background-color: var(--mds-grey-87);">Grey 87</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-54);">Grey 54</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-38);">Grey 38</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-12);">Grey 12</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-8);">Grey 8</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-3);">Grey 3</div>
</div>

### Other Colors
<span class="other-colors">
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-red-text);">Red Text</div>
    <div class="dark-contrast" style="background-color: var(--mds-red-100);">Red 100</div>
    <div class="light-contrast" style="background-color: var(--mds-red-54);">Red 54</div>
    <div class="light-contrast" style="background-color: var(--mds-red-38);">Red 38</div>
    <div class="light-contrast" style="background-color: var(--mds-red-12);">Red 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-orange-100);">Orange 100</div>
    <div class="light-contrast" style="background-color: var(--mds-orange-54);">Orange 54</div>
    <div class="light-contrast" style="background-color: var(--mds-orange-38);">Orange 38</div>
    <div class="light-contrast" style="background-color: var(--mds-orange-12);">Orange 12</div>
  </div>
  <div class="color-container">
    <div class="light-contrast" style="background-color: var(--mds-yellow-100);">Yellow 100</div>
    <div class="light-contrast" style="background-color: var(--mds-yellow-54);">Yellow 54</div>
    <div class="light-contrast" style="background-color: var(--mds-yellow-38);">Yellow 38</div>
    <div class="light-contrast" style="background-color: var(--mds-yellow-12);">Yellow 12</div>
  </div>
  <div class="color-container">
    <div class="light-contrast" style="background-color: var(--mds-lime-100);">Lime 100</div>
    <div class="light-contrast" style="background-color: var(--mds-lime-54);">Lime 54</div>
    <div class="light-contrast" style="background-color: var(--mds-lime-38);">Lime 38</div>
    <div class="light-contrast" style="background-color: var(--mds-lime-12);">Lime 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-green-100);">Green 100</div>
    <div class="light-contrast" style="background-color: var(--mds-green-54);">Green 54</div>
    <div class="light-contrast" style="background-color: var(--mds-green-38);">Green 38</div>
    <div class="light-contrast" style="background-color: var(--mds-green-12);">Green 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-cyan-100);">Cyan 100</div>
    <div class="light-contrast" style="background-color: var(--mds-cyan-54);">Cyan 54</div>
    <div class="light-contrast" style="background-color: var(--mds-cyan-38);">Cyan 38</div>
    <div class="light-contrast" style="background-color: var(--mds-cyan-12);">Cyan 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-blue-100);">Blue 100</div>
    <div class="light-contrast" style="background-color: var(--mds-blue-54);">Blue 54</div>
    <div class="light-contrast" style="background-color: var(--mds-blue-38);">Blue 38</div>
    <div class="light-contrast" style="background-color: var(--mds-blue-12);">Blue 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-indigo-100);">Indigo 100</div>
    <div class="light-contrast" style="background-color: var(--mds-indigo-54);">Indigo 54</div>
    <div class="light-contrast" style="background-color: var(--mds-indigo-38);">Indigo 38</div>
    <div class="light-contrast" style="background-color: var(--mds-indigo-12);">Indigo 12</div>
  </div>
  <div class="color-container">
    <div class="dark-contrast" style="background-color: var(--mds-violet-100);">Violet 100</div>
    <div class="light-contrast" style="background-color: var(--mds-violet-54);">Violet 54</div>
    <div class="light-contrast" style="background-color: var(--mds-violet-38);">Violet 38</div>
    <div class="light-contrast" style="background-color: var(--mds-violet-12);">Violet 12</div>
  </div>
</span>

### Representing Status

We use red, green, yellow, and orange to indicate status in several areas across our application. In those places, the following colors from our palette should be used:

#### Error

Use Red 100, `--mds-red-100`

<img alt="error message example" src="images/message-error.jpg" />

* If red text is needed, use `--mds-red-text` to uphold accessibility requirements

#### Success

Use Green 100, `--mds-green-100`

<img alt="success message example" src="images/message-success.jpg" />

* If green text is needed, use `--mds-green-text` to uphold accessibility requirements

#### Warning

Use Yellow 100, `--mds-yellow-100`

<img alt="warning message example" src="images/message-warning.jpg" />

* Yellow text is not to be used to ensure accessibility. Use colored accents instead (icons, colored bars) and black font

### Upgrading from V1 to V2

Here is a table that should help you upgrade a v1 color to v2.
Reminder: always ask your designer for feedback!
This upgrade guide is subjective.

| Color v1 | Recommended color v2 |
| ---      | ---                  |
| <div class="light-contrast" style="background-color: var(--palette-primary-dark);">`--palette-primary-dark`</div> | <div class="light-contrast" style="background-color: var(--mds-brand-100);">`--mds-brand-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-primary-base);">`--palette-primary-base`</div> | <div class="light-contrast" style="background-color: var(--mds-brand-100);">`--mds-brand-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-primary-light);">`--palette-primary-light`</div> | <div class="light-contrast" style="background-color: var(--mds-brand-54);">`--mds-brand-54`</div> |
| <div class="light-contrast" style="background-color: var(--palette-primary-hover);">`--palette-primary-hover`</div> | <div class="light-contrast" style="background-color: var(--mds-brand-100);">`--mds-brand-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-action-dark);">`--palette-action-dark`</div>| <div class="light-contrast" style="background-color: var(--mds-green-100);">`--mds-green-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-action-base);">`--palette-action-base`</div>| <div class="light-contrast" style="background-color: var(--mds-green-100);">`--mds-green-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-action-light);">`--palette-action-light`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-action-hover);">`--palette-action-hover`</div> | <div class="light-contrast" style="background-color: var(--mds-green-100);">`--mds-green-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-highlight-dark);">`--palette-highlight-dark`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-highlight-base);">`--palette-highlight-base`</div> | <div class="light-contrast" style="background-color: var(--mds-orange-100);">`--mds-orange-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-highlight-light);">`--palette-highlight-light`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-highlight-hover);">`--palette-highlight-hover`</div> | <div class="light-contrast" style="background-color: var(--mds-orange-100);">`--mds-orange-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-caution-dark);">`--palette-caution-dark`</div> | <div class="light-contrast" style="background-color: var(--mds-red-100);">`--mds-red-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-caution-base);">`--palette-caution-base`</div> | <div class="light-contrast" style="background-color: var(--mds-red-100);">`--mds-red-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-caution-light);">`--palette-caution-light`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-caution-hover);">`--palette-caution-hover`</div> | <div class="light-contrast" style="background-color: var(--mds-red-100);">`--mds-red-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-warning-dark);">`--palette-warning-dark`</div> | <div class="light-contrast" style="background-color: var(--mds-yellow-100);">`--mds-yellow-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-warning-base);">`--palette-warning-base`</div> | <div class="light-contrast" style="background-color: var(--mds-yellow-100);">`--mds-yellow-100`</div> |
| <div class="light-contrast" style="background-color: var(--palette-warning-light);">`--palette-warning-light`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-warning-hover);">`--palette-warning-hover`</div> | N/A |
| <div class="dark-contrast" style="background-color: var(--palette-brand-dark);">`--palette-brand-dark`</div> | N/A |
| <div class="dark-contrast" style="background-color: var(--palette-neutral-xx-dark);">`--palette-neutral-xx-dark`</div> | <div class="dark-contrast" style="background-color: var(--mds-grey-87);">`--mds-grey-87`</div> |
| <div class="dark-contrast" style="background-color: var(--palette-neutral-x-dark);">`--palette-neutral-x-dark`</div> | <div class="dark-contrast" style="background-color: var(--mds-grey-87);">`--mds-grey-87`</div> |
| <div class="dark-contrast" style="background-color: var(--palette-neutral-dark);">`--palette-neutral-dark`</div> | <div class="dark-contrast" style="background-color: var(--mds-grey-87);">`--mds-grey-87`</div> |
| <div class="dark-contrast" style="background-color: var(--palette-neutral-mid-dark);">`--palette-neutral-mid-dark`</div> | <div class="dark-contrast" style="background-color: var(--mds-grey-54);">`--mds-grey-54`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-base);">`--palette-neutral-base`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-38);">`--mds-grey-38`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-mid);">`--palette-neutral-mid`</div>| <div class="light-contrast" style="background-color: var(--mds-grey-38);">`--mds-grey-38`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-mid-light);">`--palette-neutral-mid-light`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-38);">`--mds-grey-38`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-light);">`--palette-neutral-light`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-12);">`--mds-grey-12`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-x-light);">`--palette-neutral-x-light`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-3);">`--mds-grey-3`</div> |
| <div class="light-contrast" style="background-color: var(--palette-neutral-xx-light);">`--palette-neutral-xx-light`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-3);">`--mds-grey-3`</div> |
| <div class="light-contrast" style="background-color: var(--palette-caution-text);">`--palette-caution-text`</div> | N/A |
| <div class="light-contrast" style="background-color: var(--palette-grey-x-light);">`--palette-grey-x-light`</div> | <div class="light-contrast" style="background-color: var(--mds-grey-3);">`--mds-grey-3`</div> |
| <div class="light-contrast" style="background-color: var(--palette-grey-light);">`--palette-grey-light`</div>| <div class="light-contrast" style="background-color: var(--mds-grey-12);">`--mds-grey-12`</div> |
| <div class="light-contrast" style="background-color: var(--palette-grey-base);">`--palette-grey-base`</div>| <div class="light-contrast" style="background-color: var(--mds-grey-38);">`--mds-grey-38`</div> |
| <div class="dark-contrast" style="background-color: var(--palette-grey-dark);">`--palette-grey-dark`</div>| <div class="dark-contrast" style="background-color: var(--mds-grey-54);">`--mds-grey-54`</div> |
| <div class="dark-contrast" style="background-color: var(--palette-grey-x-dark);">`--palette-grey-x-dark`</div>| <div class="dark-contrast" style="background-color: var(--mds-grey-87);">`--mds-grey-87`</div> |
| <div class="light-contrast" style="background-color: var(--white);">`--white`</div>| <div class="light-contrast" style="background-color: var(--white);">`--white`</div> |
| <div class="dark-contrast" style="background-color: var(--black);">`--black`</div>| <div class="dark-contrast" style="background-color: var(--black);">`--black`</div> |

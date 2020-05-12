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

<style>
  .color-container {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-x-large);
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
    max-height: 300px;
    max-width: 300px;
    width: 300px;
  }
  
  .dark-contrast {
    color: var(--white);
    padding: var(--spacing-medium);
    font-family: var(--mavenlink-type-font-family);
  }
  
  .light-contrast {
    color: var(--black);
    padding: var(--spacing-medium);
    font-family: var(--mavenlink-type-font-family);
  }
  
  .other-colors {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<h3>Brand Colors</h3>
<div class="color-container">
  <div class="dark-contrast" style="background-color: var(--mds-brand-text);">Brand Text</div>
  <div class="dark-contrast" style="background-color: var(--mds-brand-100);">Brand 100</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-54);">Brand 54</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-38);">Brand 38</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-12);">Brand 12</div>
</div>

<h3>Base Colors</h3>
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

<h3>Other Colors</h3>
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

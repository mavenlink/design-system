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
    max-height: 300px;
    max-width: 300px;
  }
  
  .light-contrast {
    color: var(--black);
    padding: var(--spacing-medium);
  }
  
  .dark-contrast {
    color: var(--white);
    padding: var(--spacing-medium);
  }
</style>

<div class="color-container">
  <div class="dark-contrast" style="background-color: var(--mds-brand-text);">Brand Text</div>
  <div class="dark-contrast" style="background-color: var(--mds-brand-100);">Brand 100</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-54);">Brand 54</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-38);">Brand 38</div>
  <div class="light-contrast" style="background-color: var(--mds-brand-12);">Brand 12</div>
</div>

<div class="color-container">
  <div class="dark-contrast" style="background-color: var(--mds-grey-87);">Grey 87</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-54);">Grey 54</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-38);">Grey 38</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-12);">Grey 12</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-8);">Grey 8</div>
  <div class="light-contrast" style="background-color: var(--mds-grey-3);">Grey 3</div>
</div>

<div class="color-container">
  <div class="dark-contrast" style="background-color: var(--mds-red-text);">Red Text</div>
  <div class="dark-contrast" style="background-color: var(--mds-red-100);">Red 100</div>
  <div class="light-contrast" style="background-color: var(--mds-red-54);">Red 54</div>
  <div class="light-contrast" style="background-color: var(--mds-red-38);">Red 38</div>
  <div class="light-contrast" style="background-color: var(--mds-red-12);">Red 12</div>
</div>

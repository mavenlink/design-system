Establishing standards on spacing is a key element in maintaining consistency between different sections of a large web app. Having a limited set of spacing options is meant to help promote a good sense of proportion among the components, and also helps engineers avoid hard-coding padding measurements and allows them to use CSS variables from our spacing stylesheet.

### Spacing Options

We use a “t-shirt size” scale for specifying spacing/margins. The following options have corresponding variables in the spacing CSS stylesheet.

<style>
    .patterns-list {
        display: flex;
        flex-direction: column;
        max-width: 225px;
    }
    
    .pattern-item {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: var(--spacing-small);
    }
    
    .pattern-text {
        font-weight: bold;
        font-family: var(--mavenlink-type-font-family);
    }
    
    .pattern {
        margin-right: var(--spacing-medium);
    }

    .x-large {
        background-color: var(--mds-red-54);
        height: var(--spacing-x-large);
        width: var(--spacing-x-large);
    }
    
    .large {
        background-color: var(--mds-orange-54);
        height: var(--spacing-large);
        width: var(--spacing-large);
    }
    
    .medium {
        background-color: var(--mds-green-54);
        height: var(--spacing-medium);
        width: var(--spacing-medium);
    }
    
    .small {
        background-color: var(--mds-blue-54);
        height: var(--spacing-small);
        width: var(--spacing-small);
    }
    
    .x-small {
        background-color: var(--mds-violet-54);
        height: var(--spacing-x-small);
        width: var(--spacing-x-small);
    }
</style>

<div class="patterns-list">
    <div class="pattern-item">
        <span class="pattern x-large"></span>
        <span class="pattern-text">spacing-x-large: 32px</span>
    </div>
    <div class="pattern-item">
        <span class="pattern large"></span>
        <span class="pattern-text">spacing-large: 16px</span>
    </div>
    <div class="pattern-item">
        <span class="pattern medium"></span>
        <span class="pattern-text">spacing-medium: 8px</span>
    </div>
    <div class="pattern-item">
        <span class="pattern small"></span>
        <span class="pattern-text">spacing-small: 4px</span>
    </div>
    <div class="pattern-item">
        <span class="pattern x-small"></span>
        <span class="pattern-text">spacing-x-small: 2px</span>
    </div>
</div>

### Base Page Guidelines

The following page spacing guidelines apply to any custom application that is embedded in a tab inside of Mavenlink, or exists on its own independent page.

#### Base Page Margins

Page top and left margins should always use `spacing-x-large`:

<img alt="page margins example" src="images/page-margins-example.jpg"/>

Page Title should be displayed against page top margin. If there is a page description, the space between Page Title and Page Description should use `spacing-large`:

<img alt="page title margins example" src="images/page-title-margins.jpg" />

If there is NOT a page description, the page between Page Title and Seciton header should use `spacing-x-large`:

<img alt="page title no text example" src="images/page-title-no-text.jpg" />

#### Page Section Margins

A ‘Section’ consists of a subheader, a collection of components, and can also include action buttons (Save, Cancel). 

Section Header should be displayed at top of Section and should be left-aligned against margin. If there is a section description, the space between Section Header and Section Description should use `spacing-large`. Spacing between Section Description and Components should also be `spacing-large`.

<img alt="section header margins" src="images/section-header-margins.jpg" />
<img alt="section header margins with text" src="images/section-header-margins-2.jpg" />

If there is NOT a section description, the space between Section Header and Components should still use `spacing-large`.

<img alt="section header margins without text" src="images/section-header-margins-no-description.jpg" />

Within a section, components should be vertically spaced from each other using `spacing-large`.

<img alt="section with multiple components" src="images/section-header-margins-with-components.jpg" />

Spacing between the last component in a section and action buttons OR another section should use `spacing-x-large`.

<img alt="section with buttons" src="images/section-margins-with-buttons.jpg" />
<img alt="section without buttons" src="images/section-margins-without-buttons.jpg" />

In general, elements on the page should align horizontally to the left side of the page. If the page consists of a table or grid of components, the farthest left component should align to the left side of the page, against margin. Horizontal space between Components should use `spacing-x-large`.

<img alt="section space between" src="images/section-space-between.jpg" />

Action buttons (Save, Cancel) should be aligned horizontally, with the primary action button on the farthest left, against the margin. Horizontal spacing between Action Buttons should use `spacing-medium`.

<img alt="section buttons space between" src="images/section-buttons-space-between.jpg" />

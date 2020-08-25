# Promoting an Internal MDS Component

Sometimes a component in Big Maven becomes valuable enough to share. If you find a component that fits that category,
this is the guide to component promotion.

## Step-by-step Guide to Promotion

1. Reach out to Web Infrastructure and ask if the component needs to be promoted. Some reasons to promote a component are
    * It is used everywhere throughout the app
    * It reflects Mavenlink branding and design patterns
    * It would be used in the Custom UI platform
2. Copy the relevant component code from Big Maven into the design system, according to the design system's structure
    * Components all go in `src/components`
3. Backfill specs as they exist in Big Maven into the new component's test file
    * All MDS components use the jest testing pattern, `*.test.jsx`
    * All MDS components use `@testing-library/react`--enzyme specs will need to be rewritten
    * All MDS components test every variation of their props--no missing cases
4. Add a markdown document showing how the component is to be used
    * This may be copied from Big Maven's design system, but may need to be reworked to match the new audience of the public
5. Ensure accessibility of the promoted component.
    * All MDS components must be accessible via a screen reader
    * Use the [Aria Examples](https://www.w3.org/TR/wai-aria-practices-1.1/) as guidelines on what roles, attributes,
      and things are needed
    * Dev QA your work using a screen reader
        * On Mac OS X, you can access the screen reader by going to System Preferences > Accessibility > Voice Over > Enable Voice Over
6. Open a PR with the changes and assign `mavenlink/design-system` group to review it
7. After acceptance, open a PR in Big Maven that uses the new component
    * An easy first step is to simply make the internal MDS component operate as a wrapper for the external one
    * Find all usages of the internal component and replace them with the external MDS one
8. After approval, merge that PR into Big Maven 

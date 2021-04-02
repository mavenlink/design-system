# Page Layout

We have several page types/layouts across the Mavenlink application. 
In order to build and maintain consistency across these pages, 
as well as simplify design and development for these pages, 
we have created these design standards around spacing and typography for each page type. 

---

## Spacing Design Tokens

To avoid hard-coding pixel measurements on pages and components, 
we rely on a set of CSS spacing variables (“design tokens”) to define those values. 
This helps keep our site consistent, aids in simplifying engineering work, and makes it easier for Design to spec out mocks. 

| Token | Value |
| --- | --- |
| --mds-spacing-x-large | 32px |
| --mds-spacing-large | 16px |
| --mds-spacing-medium | 8px |
| --mds-spacing-small | 4px |
| --mds-spacing-x-small | 2px |

On rare occasions space needs to be added that does not fall into these standard sizes. 
If this occurs, 

1. Speak with your team designer about whether the spacing can be changed in order to utilize our design tokens. If it can’t be adjusted,
1. Use multiple design tokens to reach the required spacing (ie. `calc(var(--mds-spacing-large) + var(--mds-spacing-medium))`). 
   Please utilize this option sparingly.

---

## 6-Column Grid

All base page layout standards are designed around a simple 6-column grid. 
Designing around a grid allows us to account for current and future endeavors related to making our site more responsive/flexible while still keeping layouts consistent. 

<figure class="global__html__figure">
  <img 
    alt="6-column grid layout for all page types" 
    class="global__html__img"
    src="/design-patterns/pages/images/image8.jpg" 
  />
  <figcaption class="global__html__figcaption">6-column grid layout for all page types</figcaption>
</figure>

---

# Page Types

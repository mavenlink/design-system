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
|<div style="background-color: rgb(238 205 205)">`--mds-spacing-x-large`</div> | **32px** |
|<div style="background-color: rgb(253 242 208)">`--mds-spacing-large`</div> | **16px** |
|<div style="background-color: rgb(220 233 213)">`--mds-spacing-medium`</div> | **8px** |
|<div style="background-color: rgb(204 217 245)">`--mds-spacing-small`</div> | **4px** |
|<div style="background-color: rgb(216 210 231)">`--mds-spacing-x-small`</div> | **2px** |

On rare occasions space needs to be added that does not fall into these standard sizes. 
If this occurs, 

1. Speak with your team designer about whether the spacing can be changed in order to utilize our design tokens. If it can’t be adjusted,
1. Use multiple design tokens to reach the required spacing. Please utilize this option sparingly.
   e.g. `calc(`<span style="background-color: rgb(253 242 208)">`var(--mds-spacing-large)`</span>` + `<span style="background-color: rgb(220 233 213)">`var(--mds-spacing-medium)`</span>`)`

---

## 6-Column Grid

All base page layout standards are designed around a simple 6-column grid. 
Designing around a grid allows us to account for current and future endeavors related to making our site more responsive/flexible while still keeping layouts consistent. 

<figure class="global__html__figure">
  <img 
    alt="6-column grid layout for all page types" 
    class="global__html__img"
    src="design-patterns/pages/images/image8.jpg" 
  />
  <figcaption class="global__html__figcaption">6-column grid layout for all page types</figcaption>
</figure>

---

# Page Types

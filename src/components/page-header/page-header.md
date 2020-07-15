Headings communicate the organization of the content on the page.
Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation [[1]](https://www.w3.org/WAI/tutorials/page-structure/headings/).
The nesting of the heading elements dictate the outline of the document.
The most important heading has the rank 1 (`<h1>`) which is implemented in this `PageHeader` component.
For this reasion, only 1 instance of `PageHeader` should be visible at any given time.

```js
<PageHeader
  title="Page Title"
  description="Page description text here. Lorem ipsom dolor sit amet, consectetur adipiscing elit. Nulla fermentum ornare scelerisque. Fusce semper semper velit sit amet volutpat. Fusce maximus quis enim vulputate egestas. Duis pellentesque est urna, eget laoreet felis elementum eget. Etiam vel libero sagittis risus porttitor aliquet."
/>
```

```js
<PageHeader
  title="Page Title  Without Description"
/>
```

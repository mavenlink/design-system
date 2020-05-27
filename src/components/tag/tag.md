The `Tag` component is intended to represent a value, usually in a series with `TagList`, with a minimal footprint. It works well inside of dropdowns and filters. It is used in the `CustomFieldInputMultiChoice` component through a `TagList`.

If not using inside a `TagList`, be aware that for accessibility reasons tied to keyboard navigation functionality, tags must be contained in an element with the `role="grid"` attribute set.

```
<Tag title="test" />
```

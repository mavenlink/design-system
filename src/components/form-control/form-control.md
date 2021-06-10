This is the abstract structure for accessible form controls.
It is suggested to use an existing implementation of a form control.
Otherwise, when using `<FormControl>`, you must implement:

- The `id` property is the `id` attribute of an associated control element (e.g. `<input>`)
- A required control should set the required attribute on the input
- An errored control should set an invalid validity on the input

### Accessibility

- A form control has an associated label
- A required form control has a visual indication
- An invalid form contorl has a visual message

### Examples

```js
<FormControl
  id={uuid.v4()}
  label="Basic example"
>
  <input id={uuid.v4()} />
</FormControl>
```

```js
<FormControl
  id={uuid.v4()}
  label="Required example"
  required
>
  <input id={uuid.v4()} />
</FormControl>
```

```js
<FormControl
  error="This field is required."
  id={uuid.v4()}
  label="Errored example"
  required
>
  <input id={uuid.v4()} />
</FormControl>
```

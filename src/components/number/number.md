```js
<Number id="ex-1" label="Default example" />
```

```js
<Number id="ex-2" label="Required example" required />
```

```js
<Number id="ex-3" label="Server error example" validationMessage="The server returned an error." />
```

```js
<Number id="ex-4" label="Read-only / disabled example" readOnly />
```

The number component exposes a specific ref api. It provides the following through the ref provided to it:

* `dirty`, indicating if the value it has changed to is different than the one provided to it
* `focus`, allowing a parent component to apply focus to the input field itself
* `name`, the name provided to the component
* `value`, providing the integer value of the component
* `validity`, the validity object on the input itself

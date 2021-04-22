The `Autocompleter` component is a wrapper for Select component with the additional functionality searching for a specific models from an API endpoint.

`apiEndpoint`, should be the remainder of the apiEndpoint (excluding the base api), eg. `/workspaces`.
`value` and `models` shape is expected to be an object(s) with an `id` key, and a display attribute that is one of the following: `title`, `name`, `full_name`, `currency`;

For a11z, and additional prop info, see the `Select` component.
### Default examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint={'/models'} />
```

### Initial value examples
```js
import Autocompleter from './autocompleter.jsx';
<Autocompleter apiEndpoint={'/models'} value={{id: 11, name: 'cool'}} />
```

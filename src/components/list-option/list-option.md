This component is to be used with [Listbox](/#/Components/Listbox).

```js
<ListOption value="yo">Yo</ListOption>
```

A more complete example, populating the items from an API endpoint:
```jsx
function TestComponent() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('/list');
      const listData = await response.json();

      setData(listData);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {data.map((item) => (
        <ListOption key={item} value={item}>{item}</ListOption>
      ))}
    </React.Fragment>
  )
}

<TestComponent />
```

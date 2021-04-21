For design and accessibility functionality, see [Calendar documentation](https://www.notion.so/Calendar-b4b783521f094410a25241ff5075d109).

## Keyboard Support

### Calendar mode

| Key | Focused element | Function |
| --- | --- | --- |
| Space, Enter | Change month button | Changes the month to the previous or next month |
| Space, Enter | Change year button | Changes the calendar to a list of years |
| Space, Enter | Date | Selects the active date |
| Left arrow | Date | Moves the focus to the previous date |
| Right arrow | Date | Moves the focus to the next date |
| Up arrow | Date | Moves the focus to the previous week |
| Down arrow | Date | Moves the focus to the next week |
| Home | Date | Moves the focus to the beginning of the week |
| End | Date | Moves the focus to the end of the week |
| Page Up | Date | Changes the calendar to the previous month |
| Page Down | Date | Changes the calendar to the next month |
| Shift + Page Up | Date | Changes the calendar to the previous year |
| Shift + Page Down | Date | Changes the calendar to the next year |

### Year mode

| Key | Focused element | Function |
| --- | --- |
| Space, Enter | Year | Selects the active year |
| Up arrow | Year | Moves the focus to the previous year |
| Down arrow | Year | Moves the focus to the next year |
| Home | Year | Moves the focus to the first year in the list |
| End | Year | Moves the focus to the last year in the list |

## Label Support

| Element | Label |
| --- | --- |
| Change month button | Change month to (localized) MONTH YEAR |
| Date | (Localized) MONTH DATE |


```jsx
<Calendar />
```

```jsx
<Calendar value="2012-02-28" />
```

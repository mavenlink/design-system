Default usage

```jsx
<FilePicker id="le-picker-single" title="Attach Files" />
```
Multiple

```jsx
<FilePicker id="le-picker-multi" title="Attach Multiple Files" multiple='multiple' />
```

You will likely want to supply the `receiveFilesChangedUpdates` to receive
notifications when the file list is changed.

```jsx
const callback = filelist => { alert(filelist.length) }
<FilePicker receiveFilesChangedUpdates={callback}  id="le-picker-notify" title="Attach" multiple='multiple' />
```

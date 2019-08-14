Default usage

```jsx
<FilePicker id="le-picker-single" title="Attach Files" />
```
Multiple

```jsx
<FilePicker id="le-picker-multi" title="Attach Multiple Files" multiple='multiple' />
```

The `receiveFilesChanged` prop allows you to receive notifications when
the _FileList_ has changed. (see
[File API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API))
You can then iteract with these files using the [File API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)
per file. For example, you may wish to do something like
`FileReader.readAsDataURL(someFile)` before uploading to a server endpoint.

Interact with the following example component and view the console output.

```jsx
const callback = filelist => { console.log(`length of filelist: ${filelist.length}`); }
<FilePicker receiveFilesChanged={callback}  id="le-picker-notify" title="Attach" multiple='multiple' />
```

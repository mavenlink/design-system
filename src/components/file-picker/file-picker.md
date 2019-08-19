Default usage

_Note that you can either select files via the file dialog picker, or, drop
the files onto the "dropzone"._

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
const callback = filelist => { filelist.forEach(file => console.log('file: ', file)) }
<FilePicker receiveFilesChanged={callback}  id="le-picker-notify" title="Attach" multiple='multiple' />
```

Errors

Pass a `validator` function that verifies each of the files and returns an
error message. The component will then take care of displaying these returned
errors properly. To see this, pick a file greater then 10MB:

```jsx
const fileSizeError = 'The file size cannot exceed 10MB.';
const validateFileSize = (files) => {
  const max = 10240000;
  const errors = files.reduce((acc, file) => {
    if (file.size > max) {
      acc.push(`${file.name} too big. ${fileSizeError}`);
    }
    return acc;
  }, []);
  return errors.join(' ');
}
<FilePicker validator={validateFileSize} id="validator-example" title="Attach Files" />
```

HelpIcon is a simple prebaked SVG and tooltip, as it is the standard way to demonstrate help text for components in Mavenlink.

#### Basic Usage

```jsx
import HelpIcon from "./help-icon.jsx";

<HelpIcon 
  text="This is the text that appears from the icon" 
  label="title text for the SVG" 
  id="example-tooltip"
/>
```

#### In-depth example

More realistically, the `HelpIcon` is going to be used in conjunction with other elements, like inputs or paragraphs.

```jsx
import HelpIcon from "./help-icon.jsx";

<div>
  <label style={{ display: 'block' }} htmlFor="email">Email Address</label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input type="email" id="email" aria-describedby="email-tooltip" />
    <HelpIcon 
      text="Please enter your primary email address." 
      label="help" 
      id="email-tooltip"
    />
  </div>
</div>
```

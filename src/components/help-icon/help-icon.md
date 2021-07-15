HelpIcon is a simple prebaked SVG and tooltip, as it is the standard way to demonstrate help text for components in Mavenlink.

#### Basic Usage

`HelpIcon` is intended to be used in conjunction with other elements, like inputs or paragraphs.

Much like with `Tooltip`, please remember to apply `aria-describedby` on the component the help text is related to.

```jsx
import HelpIcon from "./help-icon.jsx";

<div>
  <label style={{ display: 'block' }} htmlFor="email">Email Address</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <input type="email" id="email" aria-describedby="email-tooltip" />
    <HelpIcon 
      text="Please enter your primary email address." 
      label="help" 
      id="email-tooltip"
    />
  </div>
</div>
```

Thanks for looking into contributing! 👍

Following is a series of guidelines for contributing to Mavenlink's reusable components. Also, use your best judgement and feel free to propose changes to these guidelines in a pull request. Finally, these guidelines are inspired by [Github's Atom project](https://github.com/atom/atom/blob/8ba04f0f0c184ab1522be5129ad511752d2c3e9c/CONTRIBUTING.md) and [Mozilla's guide for open-source projects](https://mozillascience.github.io/working-open-workshop/contributing/).

**Adding a New Component**

To add a new component, first [add an RFC](https://github.com/mavenlink/rfc) for your component. This serves to get feedback on your proposed API and captures reasoning around why things were done the way they are.

Then, open a PR adding your new component to the `frontend/components` directory. Note that this can be done at the same time the RFC is open. Oftentimes, it's useful to work on your component while writing the RFC, so that you can have a good idea of the component API you want.

Some guidelines for consideration when building your component are:

- If feasible, allow users of your component to completely override **_any_** class that's being applied. That way, your component can be re-used in many different contexts, including ones that haven't been envisioned, yet.
- Use [JSDoc](http://usejsdoc.org/) to document your component and/or props. Consider using `@see` to link your component to its RFC.
- Use [CSS composition](https://github.com/css-modules/css-modules) to re-use styles, instead of concatenating string class names together.

**Updating the Styleguide**

Please feel free to also make additions, updates, or corrections to any documentation in this styleguide. This is intended to be "living" documentation, and to evolve as our thinking and practices do.

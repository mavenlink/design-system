# Decision Log

| Date         | Who   | Decision               | Context                                   |
|--------------|-------|------------------------|-------------------------------------------|
| Dec 11, 2018 | ahuth | Create MDS repo        | https://github.com/mavenlink/rfc/pull/145 |
| Dec 11, 2018 | ahuth | Use Jest for testing   | We've generally used Jasmine for testing, but that project is not very well maintained, anymore. Additionally, Jest is faster and is the most common solution in the React community. Finally, it does not require us to maintain a Webpack configuration. |
| Dec 29, 2019 | ahuth | Use react-styleguidist | We originally experimented with storybook. However, react-styleguidist seems to be easier to tweak the look and feel of. It also is intended to be a design-system site, whereas storybook is intended to be a showcase of a single component. |

# Decision Log

| Date         | Who   | Decision               | Context                                   |
|--------------|-------|------------------------|-------------------------------------------|
| Dec 11, 2018 | ahuth | Create MDS repo        | https://github.com/mavenlink/rfc/pull/145 |
| Dec 11, 2018 | ahuth | Use Jest for testing   | We've generally used Jasmine for testing, but that project is not very well maintained, anymore. Additionally, Jest is faster and is the most common solution in the React community. Finally, it does not require us to maintain a Webpack configuration. |
| Dec 29, 2018 | ahuth | Use react-styleguidist | We originally experimented with storybook. However, react-styleguidist seems to be easier to tweak the look and feel of. It also is intended to be a design-system site, whereas storybook is intended to be a showcase of a single component. |
| Jan 04, 2019 | ahuth | Do not use a project Webpack config | While we do have some webpack configuration for our react-styleguidist page, we do not have a general Webpack config for this project. That way, we don't have configuration here that we need to keep updated, or accept that it will go out of date. Instead, consumers of this library should have their own Webpack setup to process these files. |

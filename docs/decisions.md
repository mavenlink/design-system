# Decision Log

| # | Date         | Who   | Decision               | Context                                   |
|---|--------------|-------|------------------------|-------------------------------------------|
| 0 | 12/11/2018 | ahuth | Create MDS repo        | https://github.com/mavenlink/rfc/pull/145 |
| 1 | 12/11/2018 | ahuth | Use Jest for testing   | We've generally used Jasmine for testing, but that project is not very well maintained, anymore. Additionally, Jest is faster and is the most common solution in the React community. Finally, it does not require us to maintain a Webpack configuration. |
| 2 | 12/29/2018 | ahuth | Use react-styleguidist | We originally experimented with storybook. However, react-styleguidist seems to be easier to tweak the look and feel of. It also is intended to be a design-system site, whereas storybook is intended to be a showcase of a single component. |
| 3 | 01/04/2019 | ahuth | Do not use a project Webpack config | While we do have some webpack configuration for our react-styleguidist page, we do not have a general Webpack config for this project. That way, we don't have configuration here that we need to keep updated, or accept that it will go out of date. Instead, consumers of this library should have their own Webpack setup to process these files. |
| 4 | 01/07/2019 | ahuth | Use Cypress for testing the documentation site | To make sure everything is working correctly, we need a test that actually runs our react-styleguidist site and ensures everything is working properly, making integration testing the only way to go. Based on our passed experiences with Selenium (slow, flaky, very unreliable), I really wanted a non-Selenium solution. Hence Cypress. |

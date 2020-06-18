Typography in our application is important for establishing design consistency, as well as placing emphasis and hierarchical rules in the correct places in order to guide our users through the product. These are the type options which Product Design should be using in their mocks, and they are the type options Engineers should be using when building out new features or updating pages. 

#### Case

While historically we have areas of our site where we use uppercase font styles, our new policy is to use title case for headers and titles, and sentence case for long text fields. If a team is rebuilding an existing page in Mavenlink, all fonts should use these updated case styles.

#### Font

A big change to our font types involve deprecating the use of our serif font (Merriweather), and strictly use OpenSans for all type across our application. There are some areas where Merriweather will need to be used until a backfilling effort can be organized (eg. Page Headers) in order to maintain design consistency throughout the product. If there are any questions about this, please reach out to your feature teams designer or Web Infrastructure.

#### Accessibility

To aid in our accessibility efforts and ensure that our users get a delightful experience using Mavenlink, we have deprecated any font sizes smaller than 12pt.

#### Variable Usage

The following typography options are all variations of the OpenSans font:
<style>
    /*
        This ensures that the usage table fills the page. This had to be included here to override styleguidist's
        assigned styles--it won't work if it's included when included in the stylesheet.
     */
    .rsg--table-27 {
        width: 100%;
    }
</style>
<table>
    <thead>
        <tr>
            <th class="subtext">Tag</th>
            <th class="subtext">Size</th>
            <th class="subtext">Weight</th>
            <th class="subtext">Usage, example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre>h1</pre></td>
            <td>22px</td>
            <td>400</td>
            <td>
                <h1 class="page-title">Main page titles</h1>
                <pre>
                    .page-title {
                        font: var(--mds-type-page-title);
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td><pre>h2</pre></td>
            <td>16px</td>
            <td>600</td>
            <td>
                <h2 class="subhead-1">Subheads</h2>
                <pre>
                    .subhead-1 {
                        font: var(--mds-type-subhead-1);
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td><pre>h3</pre></td>
            <td>16px</td>
            <td>400</td>
            <td>
                <h3 class="subhead-2">Subheads</h3>
                <h3 class="subhead-2">Section headings</h3>
                <pre>
                    .subhead-2 {
                        font: var(--mds-type-subhead-2);
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td><pre>h4</pre></td>
            <td>14px</td>
            <td>400</td>
            <td>
                <h4 class="subhead-3">Subheads</h4>
                <pre>
                    .subhead-3 {
                        font: var(--mds-type-subhead-3);
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td><pre>p, et al.</pre></td>
            <td>14px</td>
            <td>400</td>
            <td>
                <p class="content">Normal</p>
                <p class="content">Main body copy, table data, etc.</p>
                <pre>
                    .content {
                        font: var(--mds-type-content);
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td><pre>th, et al.</pre></td>
            <td>12px</td>
            <td>400</td>
            <td>
                <span class="subtext">Sub, table headings, support copy, legal, etc.</span>
                <pre>
                    .subtext {
                        font: var(--mds-type-subtext);
                    }
                </pre>
            </td>
        </tr>
    </tbody>
</table>

#### Linter Usage

We offer a linter for use with [stylelint](https://stylelint.io/) to enforce typography usage. To use it, simply install this library and add the following to your stylelint configure file:

```json
module.exports = {
  /* ... */
  plugins: [
    /* ... */
    './node_modules/@mavenlink/design-system/src/linters/typography.js'
  ],
  rules: {
    /* ... */
    'mds/typography': true,
  },
};
```

If a violation of the linter exists, it will provide an error similar to the one below:

```json
your/faulty/stylesheet/file.css
  16:3  ✖  Please use MDS typography variables instead. See MDS Typography Docs   mds/typography
```

To fix it, adjust your styles to use one of the font variables above, according to the specification of the feature and aesthetic preference.

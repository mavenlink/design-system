A simple date field for custom fields. Permits a variety of formats and allows custom validation.

##### Basic usage:

```jsx
<CustomFieldInputDate
    id="my-birthday-1"
    label="Andre's Birthday" 
    value="1992-05-10"
/>

<CustomFieldInputDate
    id="my-birthday-2"
    label="Greyson's Birthday"
    value="08/20/2020"
/>
```
----

##### Disabled state:

```jsx
<CustomFieldInputDate
    id="my-birthday-4"
    label="Juanca's Birthday"
    value="03/03/1990" 
    disabled
/>
```
----

##### Errored state:

Below are two examples of an invalid custom field input: a syntactic error and a semantic error. The first below is
syntactically invalid--the value "definitely not a date" is not a valid date format, and the input presents this
error. The second is an example of a semantic error--the component is told that it is invalid, and it displays the help
text provided.

```jsx
<CustomFieldInputDate
    id="not-a-valid-date"
    label="Greyson's Birthday"
    value="definitely not a date"
/>

<CustomFieldInputDate
    id="not-in-range"
    label="Juanca's Birthday"
    value="1990-03-03"
    min="1992-05-10"
/>

<CustomFieldInputDate
    id="not-my-birthday"
    label="Andre's Birthday" 
    helpText="This is not my birthday"
    value="01/01/0001"
    error
/>
```
----

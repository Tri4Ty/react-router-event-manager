# Configurable Form Builder

## Overview
The Configurable Form Builder allows the creation of a React based forms via a JSON configuration file.

## Installation
Run the following NPM command to install:

```
> npm install --save configurable-form-builder
````

Run the following NPM command to launch a sample demo:

```
> npm start
```

## Usage
The Configurable Form Builder can be used as follows:

```
import ConfigurableForm from 'configurable-form-builder';

...

primaryCallback = (submittedFormValueMap) => {
    [do some logic with submitted form attribute value pairs]
}

...

<ConfigurableForm 
    title="Sample Config Form Title",
    fields=[
    {
      id: "id",
      type: "text",
      label: "Name"
    },
    {
      id: "status",
      type: "enum",
      label: "Status",
      values: ["active", "error", "pending"]
    }
  ],
  primaryButtonText: "Search",
  noAttrText: "No searchable attributes for selected entity types",
  breakpoints: {350: 1, 750: 2, 900: 3},
  primaryButtonCallback={this.primaryCallback} />
```
in order to generate the following:

![Sample Form Screenshot](/screenshot.png)

If no 'title' property is configured, there will be no title displayed.

### Responsiveness
By default the form shall display all of it's attribute files in a single column. It is possible to spread the form fields out over multiple columns while keeping it responsive to varying screen sizes. By using the 'breakpoints' property, the form can be configured to spread it's content over a number of columns (order is dictated by the order of the 'fields' property).

Example: 
The following properties setting will render all fields in a single column when the form is 350px, 2 columns when 750px wide and 3 columns when 900px or more
breakpoints: {350: 1, 750: 2, 900: 3}

![Form width larger than 900px](/screenshot_3columns.png)
![Form width larger than 750px](/screenshot_2columns.png)
![Form width less than 350px](/screenshot_1column.png)

### Configuration Properties

```
ConfigurableForm.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  values: PropTypes.object,
  primaryButtonText: PropTypes.string,
  primaryButtonCallback: PropTypes.func.isRequired,
  noAttrText: PropTypes.string,
  breakpoints: PropTypes.object
}

ConfigurableForm.defaultProps = {
  fields: [],
  primaryButtonText: PRIMARY_BUTTON_DEFAULT_TEXT,
  noAttrText: NO_FORM_ATTRIBUTES,
  breakpoints: {}
}
```

Form properties:

Property Name | Type | Required | Description | Default
------------- | ---- | -------- | ----------- | -------
title | String | No | Optional title to display above the form | N/A
fields | Array | No | a list of form fields to be rendered | []
values | Object | No | an object mapping the value set for each attribute | N/A
primaryButtonText | String | No | Optional text to display in the primary form button | "Submit"
primaryButtonCallback | Function | Yes | The callback method when the form is submitted | N/A
noAttrText | String | No | Text to display when there are no attribute fileds for the form to render | "No available attributes"
breakpoints | Object | No | Configurable breakpoints to make the form responsive | {}

Field Properties:

Property Name | Type | Required | Description
------------- | ---- | -------- | -----------
id | String | Yes | the unique identifier of the form field
type | String | Yes | the type of the form field
label | String | No | Optional text to display as the form field label
values | Array | No | optional list of values for ENUM type fields

Valid Field Property Types:

Type | Rendered Component
---- | ------------------
ENUM | Dropdown 
Anything Else | Textfield

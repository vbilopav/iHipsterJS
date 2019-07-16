[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)

# List of `script` tag custom attributes

## Essential

- ### `data-app-url`

    Defines the root path to use for all future module lookups. Default value is "`/`"

    - Example **without** `data-app-url` set:
        - In index.html: `<script src="ihjs.js"><script>`
        - In module `import stuff from "web/app/modules/stuff"; `
    
    - Example **with** `data-app-url` set:
        - In index.html: `<script data-app-url="web/app/modules/" src="ihjs.js"><script>`
        - In module `import stuff from "stuff"; `

- ### `data-app-module`

    Defines entry point or starting module for your application.
    - Example `<script data-app-module="my-app" src="ihjs.js"><script>` will load and execute `my-app.js` first.

- ### `data-view-module`

    Defines starting view which will be rendered first - if `data-app-module` is not defined.
    
    If this attribute is not defined then starting view will be content of last `template` tag without id (and without `data-route` and `data-tag`) inside document.

    #### If neither `data-app-module` or starting view are defined - inline script tags in document (if any) will be normally executed.

- ### `data-app-container-id`

    Defines element id in which default view (or views from spa application) - will be rendered.
    
    Default value is `app`.

    If element id from this attribute is not found in document, default will be rendered in `body` element.

- ### `data-url-args`

    Extra query string arguments appended to URLs of application modules. Useful for cache-busting.

## Additional configuration

- ### `data-loader-url`
- ### `data-app-object-name`
- ### `data-setting`
- ### `data-dev`
- ### `data-version`
- ### `data-load-css-always`
# Getting started

## Minimal configuration

Minimal running configuration would just to add following script with script reference tag to your web page:

```html
<script src="https://cdn.rawgit.com/vbilopav/ihjs/master/src/ihjs/dist/<version>/bundle/ihjs.js"></script>
```

Where source reference in this script tag is actually reference to CDN link of bundled and minified version of library hosted internally on GitHub. Altough this CDN works, and it has high availability it is still not real CDN since it is not as nearly as fast and it is good for examples only (until real CDN is available).


## Local installation

This library is hosted on [GitHub](https://github.com/vbilopav/ihjs) and distributed via [npm](https://www.npmjs.com/package/ihjs).

Therefor, for installation from GitHub simply download and clone source code from GitHub. Distribution directory ([dist](https://github.com/vbilopav/ihjs/tree/master/src/ihjs/dist)) is included. 

You may use original source version in `dev` folder, minified in `min` folder or minified and bundled in `bundle` folder.


For installation from NPM system, assuming that NPM system has already been installed on system, simply run:
```
npm install -g ihjs
```

That will install library globally, which is fine, but we actually recommend local installation:
```
npm install --save-dev ihjs
```

Note that you have to have already NPM initialized in directory and `package.json` created.


And after that, all you'l just have to include appropriate `script` tag into your start page, usually `index.html` that has reference to the library as described:


```html
<script src="/libs/ihjs/dist/<version>/bundle/ihjs.js"></script>
```

## Additional configuration attributes

Script tag can have additional and optional data attributes that can further configure your application:

- `data-dev` - Simple boolean flag value that can be accessed from global application object, just to flag is system in development state or not, default value is `true`.

- `data-version` - Simple string determines current scripts version. This value is automatically adds query string `v=<version-value>` to every script within system (even css if `data-css-files` attribute is used). Default value is none, no version query string is added. 

- `data-app-url` - Default application url. Every module path is relative to this url. Default is your web root at `/`.

- `data-app-module` - Module ID for application entry point. Default value is system module `sys/single-view-app` that initializes single view app (not single-page app) by using module view id from following attribute `data-view-module`. App module can only be JavaScript code file, it cannot be template since it is code entry point to application. Also, script that loads this module will except it to be function which will be called automatically with only one parameter - container element id. This is useful if you want to have custom application entry point, rather then default one. For example [this demo](https://github.com/vbilopav/ihjs/blob/master/demos/github-user1/app.js).

- `data-view-module` - Module View ID that will be rendered by deafault by `sys/single-view-app` on initialization.

- `data-app-container-id` - Application container element ID. Passed as only function parameter for every custom entry point module. Not needed when using document template (`document!id` type view module) and default `sys/single-view-app`. In that case parent element with id from `document!id` is used or parent element from last `template` tag if view module not present. Otherwise `app` is default value.

- `data-app-object-name` - Name of default application root object. Default is `_app`.

- `data-settings` - Custom application setting. Accepts only JavaScript object creation syntax. Default values is empty object `{}`

- `data-css-files` - List of css files that will be loaded on startup. This is optional behavior and it will be used by bundler build tool.

- `data-loader-url` - URL for default AMD module loader library. Default is CDN version of requirejs - `https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js`

- `data-libs-url` - Default libraries URL. System will use this URL to try to load loader library on fallout if primary module loader library fails.

Additionally I recommend to using `type="module"` in your script tag. This will ensure that library won't be loaded by older browsers like Internet Explorer or not-updated modern browsers.

Typical example would be:

```html
<script type="module" data-view-module="template!my-view-template.html" src="../node_modules/ihjs/dist/1.3.5/bundle/ihjs.js"></script>
```

## About view types and view modules

There are few module type already mentioned so far:

- **document** - Document templates have module id in this format `document!id` where id is element from within document (usually template element but not necessary) id that contains your template (which is basically just html that can contain standard JavaScript template string syntax).

- **template** - Template view is html file that is your template and uses standard JavaScript template string syntax. It has following format `template!your-view-in-html-file.html`. Your view in html file would have path relative to application path configured in script tag as described above.

- **text** - Is plain text module, simple static file with templating capability.  `text!your-file.html`

- **module** - JavaScript code module. Module ID uses standard JavaScript module syntax. It is JavaScript file without extension with path relative to application path configured in script tag as described above. View module in JS file would be usually something that is instantiable (like class or function) and that, at least have one render method that returns either a string with html, promise for a string with html, html element, promise for html element, function that returns one of two things (string or html element) or two element array. It all depends on application needs and complexity. Check out demos or rest of documentation for more info.

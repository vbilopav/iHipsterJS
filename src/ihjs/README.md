[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md)

# `iHipsterJS` Web Application Framework

Simple and very fast JavaScript Web Application Framework/Library just for real Hipsters. Because it is unique, different and totally cool. Just like Hipsters. Works best on MacBook Pro.

Seriously ... here is the simplest possible example to display remote data from remote endpoint in a list on your page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My remote data</title>
  </head>
  <body>
    <template>
      <ul>
        ${async () => this.template.forEach(await(await fetch("/endpoint/")).json(), value => `
          <li>
              ${value}
          </li>
        `)}
       </ul>
    </template>
    <script type="module" src="ihjs.js"></script>
  </body>
</html>
```

If you want cool and modern SPA (Single Page) application - you can just declare it in your templates like this:

```html

    <template data-route="/view2">
      <!-- content of view at route /view2  -->
    </template>

    <template data-route="/view1">
      <!-- content of view at route /view1  -->
    </template>

    <template data-route="/">
      <!-- content of view at default route /  -->
    </template>

```

And if you want to create reusable web components with its own tag and all, simply declare that you have a tag:

```html

    <template data-tag="my-component1">
      <!-- content of this template can be used as standard component <my-component1>/<my-component1>   -->
    </template>

    <my-component1>/<my-component1>

```

- Every template is your standard JavaScript [template string literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- Template expressions can be lambda functions (useful for code blocks) or future promises.
- Every template lambda function and promise are execute within same context and share `this` object for same template.
- Every HTML element within template that have `id` or `name` defined will have it's instance exposed in `this.model` object (with few helper jquery-like [extensions](https://github.com/vbilopav/iHipsterJS/blob/master/src/ihjs/docs/extensions.md)).
- Every template context will have couple of helper methods on `this.template` object, such as for example `this.template.import` that allows you to do your standard JavaScript imports - within template expression.
- Every event in HTML elements within template can have lambda expressions declared in event `onclick="e => console.log(this)"` and share same context and `this` as the rest of the template ... or simply point to method declared on `this` context ... or do neither and retain old JavaScript event mechanism.


All you have to do is include script tag to library at the bottom of your document:
```html
<script src="ihjs.js"></script>
```

That is it, there is no dependencies and no configuration.

Only one single script tag that can contains this framework only (with, optionally, your app bundled inside), complete with module loader and all that you need.

Dependency footprint **is minimal** as it can be. 

There is no *special* directives, no *special* attributes, not *special* syntax that should be learned. 

It is all JavaScript and Web standard and it's awesome!

You can use it also with Typescript: 
- Here is the [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/typescript), 

It can be used with Typescript and with Web Components. 
- Here is the demo: [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/todo-demo/web-components-ts), 

You can even build Single Page Application in a single HTML file.
- Demo is here: [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/document), and much more... see [demos](https://github.com/vbilopav/iHipsterJS/tree/master/demos).

And, it's fast and small. 

**Internet Explorer is not supported, nor it will be any time soon.**

## Motivation

Started initially as frontend codebase for some other project that had very specific requirements for frontend part:

- Clients are expected to be using latest browser technology - no transpilation to old ES5 JavaScript is required. 

- For older browsers like Internet Explorer that doesn't support at least ES6 standard - user would be politely warned that they need to update their browsers to use this application.

- Client JavaScript code should be smaller and faster as possible - served in a single bundle file preferably.

- Client JavaScript code should include AMD (Asynchronous Module Definition) module loader. Requirement is to be able to work with libraries that follow AMD module definition standard.

- Module loader should also be able to output format from Typescript and optionally Babel.

- Fast templating support (inside document, module or standalone html file) - supported natively by newest browsers tech.

- Independent modules and templates should be able to be bundled in a single file together with module loader and framework.

- Async support in everything from bottom up.

This framework is a side-project that resulted from initial work on vanilla ES5 JavaScript code base of that project.

Side note:

It is possible that there was/is such system or framework that would support such requirements, but, nevertheless, working on this project is invaluable learning experience and great fun. I hope someone will like it and find it useful.

## Quick start

Include script tag for this library build `ihjs.js` in your document like in example above:
```html
<script src="ihjs.js"></script>
```

Build for current version is here: [/src/ihjs/build/1.2.3/](https://github.com/vbilopav/iHipsterJS/tree/master/src/ihjs/build/1.0.0)

You can create you own custom build using build tools.

You can get it by simply downloading `ihjs.js` file - or - by cloning this repository or by installing NPM package (coming soon).

Additionally, you can also include `ihjs.js` file script from [dev](https://github.com/vbilopav/iHipsterJS/tree/master/src/ihjs/dev) dir, which would include unbundled and uncompressed source (for debugging purposes).

After that, you can dive into demos and samples. That's all. 

## Running demos

To run demos:
- Clone this demo
- Install npm 
- type node run-demos

```
$ git clone https://github.com/vbilopav/iHipsterJS.git
$ npm install
$ node run-demos
```

That will run http-server and open `/demos/` url. 

If you prefer any other server (like Live Server for Visual Studio Code for example) - you can skip all of these steps after cloning and just run your web server in your clone root, run the sever and navigate to `/demos/`.

## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza or dinner or trip around the world if you would best way to contact me is:

- [LinkedIn](https://www.linkedin.com/in/vedran-bilopavlovi%C4%87-0a60b47/)
- [Slack Channel](https://join.slack.com/t/vb-software/shared_invite/enQtNjczNTMwMTk1OTA4LTc3ODFhMzU5Yzc0ZTZlM2Y4YzE3MGNjZGUwMDNjZGQyZjVhYjNhZTAxNmY1MTgxZTEwYzkxMmI3YTVlN2I5ZDc)
- [vbilopav@gmail.com](vbilopav@gmail.com)


## License

Copyright (c) Vedran Bilopavlović.
This source code is licensed under the [MIT license](https://github.com/vbilopav/iHipsterJS/blob/master/LICENSE).


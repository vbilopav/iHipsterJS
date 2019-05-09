[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md)

# `iHipsterJS` Web Application Framework

Simple and very fast JavaScript Web Application Framework / Library just for real Hipsters. Because it is unique, different and totally cool. Just like Hipsters. Works best on MacBook Pro.

Jokes aside, here is the simplest possible example that just displays remote data from remote endpoint in a list on your page:

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
    <script src="ihjs.js"></script>
  </body>
</html>
```

That is it. 

No extra dependencies, only one, single script tag that can contain only framework with module loader or framework with module loader - bundled with entire application. 

Dependency footprint **is minimal** as it can be. 

There is no *special* directives, no *special* attributes or syntax that should be learned. It is all JavaScript and Web standard.

You can use it with Typescript - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/typescript), or with Typescript and with Web Components - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/todo-demo/web-components-ts), or, if you like, you can build Single Page Application in a single HTML file - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/document), and much more.

And, it's fast and small. 

Internet Explorer is not supported, nor it will be any time soon.

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

Simply include script tag for `ihjs.js` library in your document like in example above:
```html
    <script src="ihjs.js"></script>
```

Build for current version is hosted in this repository at following location: [/src/ihjs/build/1.0.0/](https://github.com/vbilopav/iHipsterJS/tree/master/src/ihjs/build/1.0.0)

You can get it by simply downloading `ihjs.js` file or by cloning this repository or by installing NPM package (coming soon).

Additionally, you can also include `ihjs.js` file script from [dev](https://github.com/vbilopav/iHipsterJS/tree/master/src/ihjs/dev) dir, which would include unbundled and uncompressed source (for debugging purposes).

That's all. 

Check out getting started in documentation section or browse demo samples.

## Running demos

## Documentation

## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza or dinner or trip around the world if you would:

[![Donate me](https://img.shields.io/badge/DONATE-ME-green.svg?longCache=true&style=for-the-badge)](https://www.patreon.com/vbilopav)

## License

Copyright (c) Vedran Bilopavlović.  
This source code is licensed under the [MIT license](https://github.com/vbilopav/iHipsterJS/blob/master/LICENSE).


[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md)

# `iHipsterJS` Web Application Framework

Simple and very fast JavaScript Web Application Framework / Library just for real Hipsters. Because it is unique, different and totally cool. Just like Hipsters. Works best on MacBook Pro.

Jokes aside, here is the simples possible example that just displays remote data from remote endpoint in a list on your page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
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

You can use it with Typescript - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/typescript), or with Typescript and Web Components - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/todo-demo/web-components-ts), or, if you like, you can build Single Page Application in a single HTML file - [demo](https://github.com/vbilopav/iHipsterJS/tree/master/demos/simple-spa/document), and much more.

And, it's fast and small. 

Internet Explorer is not supported, nor it will be.

## Motivation



## Quick start

## Running demos

## Documentation

## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza or dinner or trip around the world if you would:

[![Donate me](https://img.shields.io/badge/DONATE-ME-green.svg?longCache=true&style=for-the-badge)](https://www.patreon.com/vbilopav)

## License

Copyright (c) Vedran Bilopavlović.  
This source code is licensed under the [MIT license](https://github.com/vbilopav/iHipsterJS/blob/master/LICENSE).


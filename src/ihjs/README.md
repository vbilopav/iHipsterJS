[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md)

# ihjs javascript library

Built for simplicity and speed. Minimal dependency, minimal, almost no configuration, no special framework-specific syntax to be learned, minimal api, minimal learning curve, high productivity. 

> **WARNING:** it's a beta version, so, documentation may have mistakes, if you face any problems feel free to create [issues](https://github.com/vbilopav/ihjs/issues).

## Table of Contents

- [What is it?](#what-is-it)
- [Motivation](#motivation)
- [Installation](#installation)
- [Examples](#examples)
- [Roadmap](#roadmap)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## What is it?

It's a JavaScript library for rapid application development of modern JavaScript application - or - application framework - built for simplicity, speed, productivity and with minimal configuration.


Want to display simple data from your back-end endpoint on your page?

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

    <script src="https://cdn.rawgit.com/vbilopav/ihjs/master/src/ihjs/dist/<version>/bundle/ihjs.js"></script>

  </body>
</html>

```

... and that is it, only **one file** with **one dependency**. 

No new tags or attributes or syntax. No huge configuration files. Nothing new to learn. Very simple and familiar API. No configuration. No transpilation. No parsing or preparsing. No pre-pars-trans-compilation. No special syntax, no magic strings or keywords whatsoever and no long and cryptic configuration files.

Yes, yes, I know, I forgot to include 100% test coverage via mocha, chai, chai-as-promised, supertest, sinon, istanbul, sonarqube, eslint, ... but I'm not so much into occultism either.

What *is* in there, however:

- Advanced templating engine and templating support with using just JavaScript template syntax
- Views, view templates and view modules (module loader included by default)
- Model bindings, dom extensions
- Single-page-applications, client router, view engine, dependency injection and more
- Async support from bottom up - everywhere

For current list of features and capabilities check out documentation or demos. Current minified bundle size is at **27.2KB** (**8.3KB** gzipped).

## [Motivation](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f)

Honestly, world doesn't need yet another JavaScript framework. Or even library.

This is (or it least it was) - a weekend, experimental and educational pet project. I simply love to code.


I started experimenting with and learning new JavaScript features and I was also bit curious how could I implement intelligently some of common JavaScript needs and concepts that I've been using for serious projects at that time. 

After while as development and experimentation continued it became something really fun that I enjoyed working and it showed that it can be very useful, hopefully, so I decided to continue and press on.

I tried really hard to keep it as simple and concise as possible and close to official JavaScript/HTML modern standards as possible. 

Everybody is already feeling framework and configuration fatigue. 

I'd like to consider this as simple library to boost your vanilla JavaScript development.

## Installation

This library is hosted on [github](https://github.com/vbilopav/ihjs) and distributed via [npm](https://www.npmjs.com/package/ihjs).

For installation from github simply download and clone source code from github, distribution directory (dist) is included.


For installation from npm, just run:
```
npm install -g ihjs
```

That will install library globally, which is fine, but we actually recommend local installation:
```
npm install --save-dev ihjs
```

Note that you have to have already npm initialized in directory and package.json created.

And after that, all you need to include `script` tag into your start page, usually `index.html` or similar with `src` attribute referencing one of `ihjs.js` scripts.

## Examples

There is already ultra simple generic example in opening chapter [what is it?](#what-is-it).

There is also, entire [demo folder](https://github.com/vbilopav/ihjs/tree/master/demos) with (at this point) around 14 comprehensive examples (it keeps increasing) and demo applications that you can safely browse and experiment with.

Note that one of those is [spa-demo](https://github.com/vbilopav/ihjs/tree/master/demos/spa-demo) that is little bit bigger single-page-application with around 40 different views or pages implemented and each of those page is example fir itself, so if counting that single-page-application itself that would be 1+40+14=55 examples in total. Plus this one introductory example. That is around 52 examples and demos. Pretty solid for now, there will be more.



## Roadmap

You can track progress for first stable release at [this milestone](https://github.com/vbilopav/ihjs/issues/1).


## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza or dinner or trip around the world if you would:

[![Donate me](https://img.shields.io/badge/DONATE-ME-green.svg?longCache=true&style=for-the-badge)](https://www.patreon.com/vbilopav)

## License

Copyright (c) Vedran Bilopavlović.  
This source code is licensed under the [MIT license](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md).


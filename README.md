[![npm version](https://badge.fury.io/js/ihjs.svg)](https://badge.fury.io/js/ihjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md)

# iHipsterJS Web Application Framework

Simple and fast JavaScript Web Framework for real Hipsters. 
This JavaScript Framework is unique, different and totally cool. 

Just like Hipsters. 

Works best on Macbook Pro.


Here is the simplest example how to display remote data on your page:

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

Pretty unique, isn't it. It's all just JavaScript.

> **WARNING:** Framework is under construction. 



## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza or dinner or trip around the world if you would:

[![Donate me](https://img.shields.io/badge/DONATE-ME-green.svg?longCache=true&style=for-the-badge)](https://www.patreon.com/vbilopav)

## License

Copyright (c) Vedran Bilopavlović.  
This source code is licensed under the [MIT license](https://github.com/vbilopav/ihjs/blob/master/src/ihjs/LICENSE.md).


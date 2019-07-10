///<reference path="../../../../src/ihjs/dev/types/spa.d.ts"/>

import {Router, Manager} from "ihjs/spa"; 

new Router({
    routes: {"/": "demos/simple-github-browser/typescript/_app/search"},
    error: event => console.log(event)
})
.useViewManager(new Manager(document.body.html("").showElement()))
.start();
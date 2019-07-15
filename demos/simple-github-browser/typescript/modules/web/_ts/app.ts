///<reference path="../../../../../../src/ihjs/dev/types/spa.d.ts"/>

import {Router, Manager} from "ihjs/spa"; 

new Router({
    routes: {"/": "demos/simple-github-browser/typescript/modules/web/_js/search"},
    error: event => console.log(event)
})
.useViewManager(new Manager(document.find("#app").html("").showElement()))
.start();

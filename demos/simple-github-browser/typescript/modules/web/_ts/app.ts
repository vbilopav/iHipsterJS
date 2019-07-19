///<reference path="../../../../../../src/ihjs/dev/types//components.d.ts"/>
///<reference path="../../../../../../src/ihjs/dev/types/spa.d.ts"/>

import {customElementsDefine} from "ihjs/components";
import {Router, Manager} from "ihjs/spa"; 

customElementsDefine({tag: "github-result", src: "elements/github-result"});

new Router({
    routes: {"/": "views/search-view"},
    error: event => console.log(event)
})
.useViewManager(new Manager(document.find("#app").html("").showElement()))
.start();

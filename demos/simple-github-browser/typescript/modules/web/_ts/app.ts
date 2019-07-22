///<reference path="../../../../../../src/ihjs/dev/types//components.d.ts"/>
///<reference path="../../../../../../src/ihjs/dev/types/spa.d.ts"/>

import {customElementsDefine} from "ihjs/components";
import {Router, Manager} from "ihjs/spa"; 

customElementsDefine(
    {tag: "github-result", src: "elements/github-result"},
    {tag: "user-github-star", src: "elements/user-github-star"}
);

new Router({
    routes: {
        "/": "views/search-view",
        "/details": "views/details-view",
        "/saved-items": "views/saved-items-view"
    },
    error: event => console.log(event)
})
.useViewManager(new Manager(document.find("#app").html("").showElement()))
.start();

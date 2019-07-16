///<reference path="../../../../src/ihjs/build/1.2.3/types/core.d.ts"/>
///<reference path="../../../../src/ihjs/build/1.2.3/types/spa.d.ts"/>

import {Router, Manager} from "ihjs/spa"; 


new Router({
    routes: {
        "/": {
            view: "github-user"
        },
        "/github-user-info": {
            view: "github-user-info",
            paramsMap: params => (params.length === 1 ? params[0] : false)
        }
    },
    error: event => console.log(event)
})
.useViewManager(new Manager(document.body.html("").showElement()))
.start()


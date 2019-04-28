///<reference path="../../../../src/ihjs/build/1.0.0/types/core.d.ts"/>
///<reference path="../../../../src/ihjs/build/1.0.0/types/spa.d.ts"/>

import {Router, Manager} from "$/spa"; 


new Router({
    routes: {
        "/": {
            view: "demos/simple-spa/typescript/app/github-user"
        },
        "/github-user-info": {
            view: "demos/simple-spa/typescript/app/github-user-info",
            paramsMap: params => (params.length === 1 ? params[0] : false)
        }
    },
    error: event => console.log(event)
})
.useViewManager(new Manager(document.body.html("").showElement()))
.start()


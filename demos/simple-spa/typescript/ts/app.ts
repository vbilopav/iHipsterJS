///<reference path="../../../../src/ihjs/build/1.0.0/types/core.d.ts"/>
///<reference path="../../../../src/ihjs/build/1.0.0/types/spa.d.ts"/>

import {Router, Manager} from "$/spa"; 


export default (appElementId: string) => new Router({
    routes: {
        "/": {
            view: "demos/simple-spa/typescript/js/github-user"
        },
        "/github-user-info": {
            view: "demos/simple-spa/typescript/js/github-user-info",
            paramsMap: params => (params.length === 1 ? params[0] : false)
        }
    },
    error: event => console.log(event)
})
.useViewManager(new Manager(document.getElementById(appElementId).html("").showElement()))
.start()

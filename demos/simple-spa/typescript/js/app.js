define(["require", "exports", "$/spa"], function (require, exports, spa_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (appElementId) => new spa_1.Router({
        routes: {
            "/": {
                view: "demos/simple-spa/module1/github-user"
            },
            "/github-user-info": {
                view: "demos/simple-spa/module1/github-user-info",
                paramsMap: params => (params.length === 1 ? params[0] : false)
            }
        },
        error: event => console.log(event)
    })
        .useViewManager(new spa_1.Manager(document.getElementById(appElementId).html("").showElement()))
        .start();
});

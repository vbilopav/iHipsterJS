///<reference path="../../../../../../src/ihjs/dev/types/spa.d.ts"/>
define(["require", "exports", "ihjs/spa"], function (require, exports, spa_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new spa_1.Router({
        routes: { "/": "demos/simple-github-browser/typescript/modules/web/_js/search" },
        error: event => console.log(event)
    })
        .useViewManager(new spa_1.Manager(document.find("#app").html("").showElement()))
        .start();
});
//# sourceMappingURL=app.js.map
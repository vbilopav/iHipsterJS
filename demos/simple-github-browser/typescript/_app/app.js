define(["require", "exports", "ihjs/spa"], function (require, exports, spa_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new spa_1.Router({
        routes: { "/": "demos/simple-github-browser/typescript/_app/search" },
        error: event => console.log(event)
    })
        .useViewManager(new spa_1.Manager(document.body.html("").showElement()))
        .start();
});
//# sourceMappingURL=app.js.map
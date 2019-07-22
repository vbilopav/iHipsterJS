///<reference path="../../../../../../src/ihjs/dev/types//components.d.ts"/>
///<reference path="../../../../../../src/ihjs/dev/types/spa.d.ts"/>
define(["require", "exports", "ihjs/components", "ihjs/spa"], function (require, exports, components_1, spa_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_1.customElementsDefine({ tag: "github-result", src: "elements/github-result" }, { tag: "user-github-star", src: "elements/user-github-star" });
    new spa_1.Router({
        routes: {
            "/": "views/search-view",
            "/details": "views/details-view",
            "/saved-items": "views/saved-items-view"
        },
        error: event => console.log(event)
    })
        .useViewManager(new spa_1.Manager(document.find("#app").html("").showElement()))
        .start();
});
//# sourceMappingURL=app.js.map
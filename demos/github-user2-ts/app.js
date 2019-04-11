var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "$/spa/router", "$/spa/view-manager"], function (require, exports, router_1, view_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    router_1 = __importDefault(router_1);
    view_manager_1 = __importDefault(view_manager_1);
    exports.default = (appElementId) => {
        const app = document.getElementById(appElementId);
        new router_1.default({
            routes: {
                "/": {
                    view: "demos/github-user2/github-user"
                },
                "/github-user-info": {
                    view: "demos/github-user2/github-user-info",
                    paramsMap: (params) => (params.length === 1 ? params[0] : false)
                }
            },
            error: (event) => console.log(event)
        })
            .useViewManager(new view_manager_1.default(app))
            .start();
        app.html("").show();
    };
});

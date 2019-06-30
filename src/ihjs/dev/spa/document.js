define([
    "ihjs/spa/router", 
    "ihjs/spa/view-manager", 
    "ihjs/template/load-text",
    "ihjs/template/parser",
    "ihjs/app"
], (
    Router, 
    Manager,
    {getTemplate},
    {parseTemplate},
    app
) => (templates, element) => {

    app.__temp = (_, ...subs) => {
        for (let sub of subs) {
            if (sub.toString().indexOf("paramsMap") === -1) {
                continue;
            }
            sub();
            return;
        }
    }

    const routes = {};

    for (let template of templates) {
        let path = template.dataset.route;
        if (!template.dataset.route) {
            continue;
        }
        let 
            t = getTemplate(undefined, template),
            view = (data, locale) => parseTemplate(t.html, data, locale);
            view._isTemplate = true;
        if (path === "error" || path === "404" || path === "unknown") {
            routes["/error"] = {view: view};
            continue;
        }
        let route = {view: view};
        let that = {};
        Function("return " + app.config.name + ".__temp`" + t.html + "`;").call(that);
        if (that.paramsMap) {
            route.paramsMap = that.paramsMap;
        }
        routes[path] = route;
    }

    delete app.__temp;

    new Router({
        routes: routes, 
        error: event => {
            console.error(event);
            if (routes["/error"]) {
                event.router.reveal("/error");
            }
        }
    }).useViewManager(new Manager(element.html("").showElement())).start();

});

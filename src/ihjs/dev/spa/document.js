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
        for (let [i, sub] of Object.entries(subs))  {
            if (sub.toString().indexOf("paramsMap") === -1) {
                continue;
            }
            sub();
            delete subs[i];
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
            route = {},
            t = getTemplate(undefined, template),
            view = (data, locale) => {
                data.template = {route: route};
                return parseTemplate(t.html, data, locale);
            }
            view._isTemplate = true;
        if (path === "error" || path === "404" || path === "unknown") {
            routes["/error"] = {view: view};
            continue;
        }
        route["view"] = view;
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

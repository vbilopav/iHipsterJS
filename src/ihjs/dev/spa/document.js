define([
    "ihjs/spa/router", 
    "ihjs/spa/view-manager", 
    "ihjs/template/load-text",
    "ihjs/template/parser",
    "ihjs/template/import",
    "ihjs/app",
    "ihjs/view-manager/utils"
], (
    Router, 
    Manager,
    {getTemplate},
    {parseTemplate},
    {parseImportsAsync},
    app,
    {isTemplate}

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

    (async () => {

        const routes = {};

        for (let template of templates) {
            const path = template.dataset.route;
            if (!path) {
                continue;
            }
            const route = {};
            let content, view;
            if (template.dataset.src) {
                let result = await ihjs.import(template.dataset.src);
                if (!isTemplate(undefined, result)) {
                    routes[path] = template.dataset.src;
                    continue;
                } 
                content = result._raw;
                view = (data, locale) => {
                    data.template = {route: route};
                    return result(data, locale);
                };
            } else {
                content = getTemplate(undefined, template).html;
                await parseImportsAsync(content);
                view = (data, locale) => {
                    data.template = {route: route};
                    return parseTemplate(content, data, locale);
                };
            }
            view._isTemplate = true;
            if (path === "error" || path === "404" || path === "unknown") {
                routes["/error"] = {view: view};
                continue;
            }
            route["view"] = view;
            const that = {};
            Function("return " + app.config.name + ".__temp`" + content + "`;").call(that);
            if (that.paramsMap) {
                route.paramsMap = that.paramsMap;
            }
            routes[path] = route;
        }

        return routes;

    })().then(routes => {

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

});

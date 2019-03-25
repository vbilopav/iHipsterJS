define([
    "sys/spa/router",
    "sys/spa/view-manager",
    "template!templates/layout.html",
    "routes/main"
], (
    Router,
    Manager,
    layout,
    routes
    
) => appElementId => {

    document.title = "SPA app demo";

    var app;

    const 
        page = new _app.Model().bind(document.body),
        validRoute = route => route && route.data,
        router = new Router({
            routes: routes,
            navigate: event => validRoute(event.route) && app[event.route.id.toCamelCase()].addClass("active"),
            leave: event => validRoute(event.route) && app[event.route.id.toCamelCase()].removeClass("active"),
            error: event => event.router.reveal("/not-found")
        }),
        routerData = router.getData();

    page[appElementId].html(
        layout({
            home: routerData.filter(item => item.id == "home")[0],
            templates: routerData.filter(item => item.category === "templates"),
            modules: routerData.filter(item => item.category === "modules"),
            models: routerData.filter(item => ["dependency-injection", "model-binding"].includes(item.category)),
            advanced: routerData.filter(item => ["remote-data", "components", "todo"].includes(item.category)),
        })
    );

    app = new _app.Model().bind(page[appElementId]);
    router.useViewManager(new Manager(app.container)).start();
    page[appElementId].show();
});

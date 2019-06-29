define(
    ["ihjs/spa"], ({Router, Manager}) => new Router({
        routes: {
            "/": {
                view: "demos/simple-spa/module2/github-user"
            },
            "/github-user-info": {
                view: "demos/simple-spa/module2/github-user-info",
                paramsMap: params => (params.length === 1 ? params[0] : false)
            }
        },
        error: event => console.log(event)
    })
    .useViewManager(new Manager(document.getElementById("app").html("").showElement()))
    .start()
);

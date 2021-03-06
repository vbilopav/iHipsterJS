define(
    ["ihjs/spa"], ({Router, Manager}) => new Router({
        routes: {
            "/": {
                view: "github-user"
            },
            "/github-user-info": {
                view: "github-user-info",
                paramsMap: params => (params.length === 1 ? params[0] : false)
            }
        },
        error: event => console.log(event)
    })
    .useViewManager(new Manager(document.getElementById("app").html("").showElement()))
    .start()
);

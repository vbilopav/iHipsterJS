define(["sys/spa/router", "sys/spa/view-manager"], (Router, Manager) => appElementId => {

    const 
        app = document.getElementById(appElementId);

    new Router({
        routes: {
            "/": {
                view: "template!demos/github-user-template/github-user.html"
            },
            "/github-user-info": {
                view: "template!demos/github-user-template/github-user-info.html",
                paramsMap: params => (params.length === 1 ? params[0] : false)
            }
        },
        error: event => console.log(event)
    })
    .useViewManager(new Manager(app))
    .start();

    app.html("").show();
});

import Router from "$/spa/router"; 
import Manager from "$/spa/view-manager";

export default (appElementId: string) => {

    const 
        app = document.getElementById(appElementId);

    new Router({
        routes: {
            "/": {
                view: "demos/github-user2/github-user"
            },
            "/github-user-info": {
                view: "demos/github-user2/github-user-info",
                paramsMap: (params: any[]) => (params.length === 1 ? params[0] : false)
            }
        },
        error: (event: any) => console.log(event)
    })
    .useViewManager(new Manager(app))
    .start();

    (app as any).html("").show();
};

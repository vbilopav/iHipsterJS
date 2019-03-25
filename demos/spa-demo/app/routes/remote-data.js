define([], () => {

    return {


        "/remote-data-example": {
            view: "views/remote-data/frameworks",
            data: {
                title: "Remote data - master detail example",
                category: "remote-data"
            }
        }, 

        "/remote-data-example/details": {
            view: "views/remote-data/framework-details",
            paramsMap: params => {
                if (params.length !== 1) {
                    return false;
                }
                return params[0];
            },
        },

        "/github-user-info-example": {
            view: "views/remote-data/github-user-info-example",
            data: {
                title: "github user info example",
                category: "remote-data"
            }
        },

        "/github-user-info": {
            view: "views/remote-data/github-user-info",
            paramsMap: params => {
                if (params.length !== 1) {
                    return false;
                }
                return params[0];
            }
        }
    }
});

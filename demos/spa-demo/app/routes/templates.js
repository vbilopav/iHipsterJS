define([], () => {

    return {

        "/plain-text": {
            view: "text!views/templates/plain-text-view.html",
            data: {
                title: "Plain text view",
                category: "templates"
            }
        },

        "/keep-state": {
            view: "text!views/templates/state-view.html",
            data: {
                title: "Plain text view - state handling",
                category: "templates"
            }
        }, 

        "/parameterized": {
            view: "template!views/templates/parameterized.html", 
            paramsMap: params => {
                if (params.length > 3) {
                    return false;
                }
                return {
                    first: params[0],
                    second: Number(params[1]),
                    third: params[2] ? params[2].split(",") : []
                };
            },
            data: {
                title: "Parameterized",
                category: "templates"
            }
        },

        "/parameterized/sub-route": {
            view: "template!views/templates/parameterized-sub-route.html", 
            paramsMap: params => {
                if (params.length > 1) {
                    return false;
                }
                return {
                    firstAndOnly: params[0]
                };
            },
            data: {
                title: "Parameterized sub route",
                category: "templates"
            }
        },

        "/composite": {
            view: "template!views/templates/composite/template1.html", 
            data: {
                title: "Composite template",
                category: "templates"
            },
            paramsMap: params => params
        },

        "/unbundled-text-view": {
            view: "text!views/templates/unbundled-text-view.html", 
            data: {
                title: "Unbundled text template",
                category: "templates"
            }
        },

        "/unbundled-parametrized-view": {
            view: "template!views/templates/unbundled-parametrized-view.html", 
            data: {
                title: "Unbundled parametrized view template",
                category: "templates"
            },         
            paramsMap: params => {
                if (params.length > 1) {
                    return false;
                }
                return {
                    param: params[0]
                };
            },
        },

        "/promise-in-template": {
            view: "template!views/templates/promise-in-template.html",
            paramsMap: async(params) => {
                if (params.length !== 0) {
                    return false;
                }
                const response = await fetch("../shared/frameworks.json", {cache: "no-store"});
                return {
                    data: await response.json()
                }
            },
            data: {
                title: "Promise in template",
                category: "templates"
            }
        },

        "/template-variables": {
            view: "template!views/templates/template-variables.html",
            data: {
                title: "Template variables",
                category: "templates"
            }
        },

        "/async-in-template": {
            view: "template!views/templates/async-template.html",
            data: {
                title: "Async template",
                category: "templates"
            }
        },

        "/crossdomain-text-example": {
            view: "cors-text!https://crossdomain-example.netlify.com/text-module1.html",
            //view: "cors-template!http://127.0.0.1:8081/template1.html",
            data: {
                title: "Crossdomain text example",
                category: "templates"
            }
        }, 

        "/crossdomain-template-example": {
            view: "cors-template!https://crossdomain-example.netlify.com/template1.html",
            //view: "cors-template!http://127.0.0.1:8081/template1.html",
            data: {
                title: "Crossdomain template example",
                category: "templates"
            },
            paramsMap: params => {
                return {
                    foo: "bar"
                }
            }
        }

    }
});

define([], () => {

    return {

        "/declarative-binding-simple": {
            view: "views/model-binding/declarative-simple",
            data: {
                title: "Simple declarative binding",
                category: "model-binding"
            }
        }, 

        "/declarative-model-model-events": {
            view: "views/model-binding/declarative-model-events",
            data: {
                title: "Declarative model binding and model events",
                category: "model-binding"
            }
        }, 

        "/declarative-model-view-events": {
            view: "views/model-binding/declarative-view-events",
            data: {
                title: "Declarative model binding and view events",
                category: "model-binding"
            }
        }, 

        "/programmatic-model-binding": {
            view: "views/model-binding/programmatic",
            data: {
                title: "Model binding - programmatic",
                category: "model-binding"
            }
        }

    }
});

define([], () => {

    return {

        "/dependency-injection-template": {
            view: {
                name: "template!views/dependency-injection/template.html",
                inject: [
                    "template!views/dependency-injection/injected/template.html",
                    "views/dependency-injection/injected/custom-module1",
                    "views/dependency-injection/injected/custom-module2"
                ] 
            },
            data: {
                title: "Dependency injection - template",
                category: "dependency-injection"
            }
        }, 

        "/dependency-injection-class-module": {
            view: {
                name: "views/dependency-injection/class-module",
                inject: [
                    "template!views/dependency-injection/injected/template.html",
                    "views/dependency-injection/injected/custom-module1",
                    "views/dependency-injection/injected/custom-module2"
                ]
            },
            data: {
                title: "Dependency injection - class module",
                category: "dependency-injection"
            }
        }
    }

});

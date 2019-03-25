define([], () => {

    return {

        "/todo-app-template-demo1": {
            view: "template!views/todo-app/todo-template.1.html",
            data: {
                title: "todo app demo implemented in template 1",
                category: "todo"
            }
        },

        "/todo-app-template-demo2": {
            view: "template!views/todo-app/todo-template.2.html",
            data: {
                title: "todo app demo implemented in template 2",
                category: "todo"
            }
        },

        "/todo-app-module-demo": {
            view: "views/todo-app/todo-module",
            data: {
                title: "todo app demo implemented in module",
                category: "todo"
            }
        }

    }
});

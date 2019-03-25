define(["template!views/modules/_default.html"], (template) => template({
    header: "This is module view that returns plain-text from template",
    firstLine: "View modules can return simple, plain text.",
    secondLine: "",     
    viewLocation: "/app/views/modules/module-plain-text-template.js",
    routeDefintion: `"/module-plain-text-template": {
    view: "views/modules/module-plain-text-template",
    data: {
        title: "Simple text from module",
        category: "modules"
    }
}`,
    closingLine: ""
}));

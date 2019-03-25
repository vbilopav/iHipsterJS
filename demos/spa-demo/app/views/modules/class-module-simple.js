define(["template!views/modules/_default.html"], template => class {

    //
    // constructor is optional, it receives view id and view element
    //

    constructor({id}) {
        console.log(id + " created");
    }

    //
    // The render method is required.
    // It receives params object and view element (in this example, we remembered in constructor)
    // The render will render any string it returns ... if it is returned
    //

    render({params}) {
        return template({
            header: 
                "This is simple class module.",
            firstLine: 
                "View modules can return classes that will be instantiated by view manager.<br />",
            secondLine: 
                "This is simple example with render method that is called every time " +
                "parameters are changed or module is created and it returns simple text to be rendered.",
            viewLocation: 
                "/app/views/modules/class-module-simple.js",
            routeDefintion: 
                '"/class-module-simple": {\n' +
                '    view: "views/modules/class-module-simple",\n' +
                '    data: {\n' +
                '        title: "Simple text from class module",\n' +
                '        category: "modules"\n' +
                '    },\n' +
                '    paramsMap: (...params) => params\n' +
                '}',
            closingLine:
                "For more info see comments in module js code...<br /><br />" +
                "Here is the list of current params for this view (type them in address bar manually):<br /><span id='params'>" +
                params.join("<br />") + "</span>"
        });
    }
});
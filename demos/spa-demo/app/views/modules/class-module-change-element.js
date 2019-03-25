define(["template!views/modules/_default.html"], template => class {

    //
    // constructor is optional, it receives only id and newly created view element
    //

    constructor({id, element}) {
        console.log(id + " created");
        // remember element reference (note: element is also second parameter in render and change)
        this.element = element
    }

    //
    // The render method is same as in previous example (class-module-simple.js)
    // However, when "change" method is present, "render" will be called only once - the first time
    //

    render({params}) {
        return template({
            header: 
                "Class module with change method handler.",
            firstLine: 
                "Change method will be called every time parameters are changed. <br />" + 
                "Render will be called only first time this view is created. <br />",
            secondLine: 
                "In this example render is used to return text template to be rendered.<br />" +
                "Change is called when parameters are changed and it renders them trough direct element manipulation.<br />" +
                "If change returns string it will replace current element content.",            
            viewLocation: 
                "/app/views/modules/class-module-change-element.js",
            routeDefintion: 
                '"/class-module-change-element": {\n' +
                '    view: "views/modules/class-module-change-element",\n' +
                '    data: {\n' +
                '        title: "Class module with change method",\n' +
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

    //
    // The change method is called every time parameters are changed.
    // If we return string here, it will replace entire content.
    //

    change({params}) {
        // #params should be cached, this is just an example
        this.element.find("#params").html(params.join("<br />"))
    }
});
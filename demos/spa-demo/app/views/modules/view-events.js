define(["template!views/modules/_default.html"], template => class {

    //
    // if callRenderOnlyOnce view option is set to true (false is default)
    // render method will be called only once, first time, reagrdless of parameters change 
    // and the fact that change method is missing.
    //
    // we do this to execute render once and take reference of element which will be changed later in events example (rendered and changed)
    //
    constructor({options}) {
        options.callRenderOnlyOnce = true;
    }

    render({params, element}) {
        element.html(template({
                header: 
                    "View events",
                firstLine: 
                    "Demonstration of view event handlings.<br />",
                secondLine: 
                    "There are two predefined events on each view - rendered and changed.<br />",
                viewLocation: 
                    "/app/views/modules/view-events.js",
                routeDefintion: 
                    '"/view-events": {\n' +
                    '    view: "views/modules/view-events",\n' +
                    '    data: {\n' +
                    '        title: "View events",\n' +
                    '        category: "modules"\n' +
                    '    },\n' +
                    '    paramsMap: (...params) => params\n' +
                    '}',
                closingLine: String.html`Change some parameters manually and see output in console bellow:<br /><br />
                <div class="panel panel-default">
                    <div class="panel-heading">output:</div>
                    <div class="panel-body">
                    </div>
                </div>
                `
            })
        );
        // render is executed only once, regardless on parameter change, so we will take reference for output panel here
        this.panel = element.find(".panel-body");
    }

    //
    //  rendered is triggered first time view is rendered (after it is shown for the first time)
    //
    rendered({params, element}) {
        let msg  = 
            `view with element id "${element.id}" and view id "${element.dataset.id}" and with parameters ${params.join(", ")} has just been rendered!`;
        this.panel.html("> " + msg + "<br /><br />") 
        console.log(msg);
    }

    //
    //  change is triggered every time after parameters are changed
    //
    changed({params, element}) {
        let msg  = 
            `view with element id "${element.id}" and view id "${element.dataset.id}" and with parameters ${params.join(", ")} has just been changed!`;
        this.panel.html(this.panel.html() + "> " + msg + "<br /><br />") 
        console.log(msg);
    }
});

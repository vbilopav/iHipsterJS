define(["template!views/modules/_default.html"], template => {

    var module,
        handleButtonClickEvent = event => {
            let msg = event.target.id + " button clicked and handled in static private function"
            module.panel.html(module.panel.html() + "> " + msg + "<br />");
            console.log(msg);
        }

    const moduleClass = class {
        
        constructor() {
            module = this;
        }
        
        render({params, element}) {
            return template({
                header: 
                    "Event handlings",
                firstLine: 
                    "Demonstration of different element event handling tehniques.",
                secondLine: 
                    "",
                viewLocation:
                    "/app/views/modules/view-events.js",
                routeDefintion:
                    '"/view-events": {\n' +
                    '    view: "views/modules/view-events",\n' +
                    '    data: {\n' +
                    '        title: "View events",\n' +
                    '        category: "modules"\n' +
                    '    },\n' +
                    '}',
                closingLine: String.html`These are two buttons to be clicked here:
                    <span>
                        <button id="button1">button1 click here!</button>
                        <button id="button2">button2 click here!</button>
                        <button id="button3">button3 click here!</button>
                    </span>
                    <br /><br />
                <div class="panel panel-default">
                    <div class="panel-heading">output:</div>
                    <div class="panel-body"></div>
                </div>
                `
            });
        }

        rendered({params, element}) {
            this.panel = element.find(".panel-body");
            element.find("#button1").on("click", (e) => {
                this.handleButtonClickEvent(e);
            });
            element.find("#button2").on("click", (e) => this.handleButtonClickEvent(e));
            element.find("#button3").on("click", handleButtonClickEvent);
        }

        handleButtonClickEvent(event) {
            let msg = event.target.id + " button clicked and handled in instance method"
            this.panel.html(this.panel.html() + "> " + msg + "<br />");
            console.log(msg);
        }
    }

    return moduleClass;
});

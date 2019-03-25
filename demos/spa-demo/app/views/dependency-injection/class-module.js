define([], () => class {
     
    constructor({}, template1, module1, module2) {
        this.template1 = template1;
        this.module1 = module1;
        this.module2 = module2;
    }

    render() { 
        return String.html`
        <div>
            <h3>Dependency injection - class module</h3>
            <p>
                Demonstration of dependency injection mechanism into class module
                <br />
                This class  module, and all injected templates and modules are loaded at the same time asynchronously.
                <br /><br />
                View location: <pre>/app/views/remote-data/di/class-module.js</pre>
                <br />
                injected template.html:
                ${this.template1({
                    heading: "heading of injected injected/template.html to class-module",
                    body: "body of injected injected/template.html to class-module",
                })} 
                <br />
                injected custom-module1: 
                ${this.module1.getHtmlContent( 
                    "heading of injected injected/custom-module1 to class-module",
                    "body of injected injected/custom-module1 to class-module",
                )}
                <hr />
            </p>
        </div>`
    }

    rendered() {
        this.module2.sayHiToConsole() 
    }

})
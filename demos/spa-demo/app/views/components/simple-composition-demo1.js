define([], () => class {

    constructor (args) {
        this.ctorArgs = args
    }

    async render(args) {
        this.composedView = new (await _app.import("views/components/example-view"))(this.ctorArgs);
        
        return [() => String.html`
            <div class="">
                <h3>Simple parse html inside class view demonstration</h3>
                <p>
                    Views can be imported and created outside template.
                    <br /><br />
                    View location: 
                    <pre>/app/views/components/simple-parse-import-demo1.js</pre>
                    <br />
                    <br />
                    Composed view:
                    <hr />
                    ${this.view.render(this.args)}
                </p>
            </div>`, {view: this.composedView, args: args}
        ]
    }

    rendered(args) {
        this.composedView.rendered(args)
    }
});
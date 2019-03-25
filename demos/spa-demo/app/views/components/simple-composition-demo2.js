define(["views/components/example-view"], ExampleView => class {

    constructor (args) {
        this.composedView = new ExampleView(args)
    }

    render(args) {
        return [() => String.html`
            <div class="">
                <h3>Simple parse html inside class view demonstration</h3>
                <p>
                    Views can also be imported traditional way, created outside template, and rendered inside.
                    <br /><br />
                    View location: 
                    <pre>/app/views/components/simple-parse-import-demo2.js</pre>
                    <br />
                    <br />
                    Composed view:
                    <hr />
                    ${this.composed}
                </p>
            </div>`, {composed: this.composedView.render(args)}
        ]
    }

    rendered(args) {
        this.composedView.rendered(args)
    }
});
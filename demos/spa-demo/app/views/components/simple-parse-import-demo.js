define([], () => class {

    render() {
        return [() => String.html`
            <div class="">
                <h3>Simple parse html inside class view demonstration</h3>
                <p>
                    You can parse templates inside inline html.
                    <br /><br />
                    View location: 
                    <pre>/app/views/components/simple-parse-import-demo.js</pre>
                    <br />
                    <br />
                    Value from context "contextVar" = ${this.contextVar}
                    <br />
                    Imported, rendered view:
                    <hr />
                    ${new (this.template.import("views/components/example-view"))().render()}
                </p>
            </div>`, {contextVar: "some value"}
        ]
    }
});
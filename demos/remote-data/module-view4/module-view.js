define(["$composite!demos/remote-data/module-view3/templates.html"], templates => class {

    //
    // if render returns function or array [func, args], template will be avaluated immediately
    //
    render() {
        let [headerTemplate, itemTemplate] = templates();
        return () => String.html`
        <div>
            <p>
                <h2>JavaScript application frameworks</h2>
            </p>
            ${async () => this.template.forEach(await _app.fetch("../../shared/frameworks.json"), (name, item) => 
                `<div class="panel panel-default" name="${name}">
                    ${headerTemplate(name)}
                    <ul>
                        ${this.template.forEach(item, (key, value) => itemTemplate(key, value))}
                    </ul>
                </div>`
            )}
        </div>
        `;
    }

    rendered({element}) {
        console.log("Template rendered into element:");
        console.log(element);
        console.log("I also have following model defined:");
        console.log(this.model);
    }
})
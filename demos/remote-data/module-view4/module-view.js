define(["template-functions!templates.html"], ({headerTemplate, itemTemplate})  => class {
    //
    // if render returns function or array [func, args], template will be avaluated immediately and result will be rendered 
    //
    render() {
        return [() => String.html`
            <div>
                <p>
                    <h2>JavaScript application frameworks</h2>
                </p>
                ${async () => this.template.forEach(await ihjs.fetch("../../shared/frameworks.json"), (name, item) => 
                    `<div class="panel panel-default" name="${name}">
                        ${this.headerTemplate(name)}
                        <ul>
                            ${this.template.forEach(item, (key, value) => this.itemTemplate(key, value))}
                        </ul>
                    </div>`
                )}
            </div>
            `, 
            {headerTemplate, itemTemplate}
        ];
    }

    rendered({element}) {
        console.log("Template rendered into element:");
        console.log(element);
        console.log("I also have following model defined:");
        console.log(this.model);
    }
})
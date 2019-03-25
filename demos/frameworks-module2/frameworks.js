define([], () => class {

    render() {
        return () => String.html`
            <div class="container-fluid">
            <p class="text-center">
                <h2>JavaScript application frameworks</h2>
            </p>
                ${async () => this.template.forEach(await _app.fetch("../shared/frameworks.json"), (name, item) => String.html`
                    <div class="panel panel-default">
                        <div class="panel-heading">${name}</div>
                        <ul class="list-group">
                            ${this.template.forEach(item, (key, value) => String.html`
                                <li class="list-group-item">
                                    <strong>${key}: </strong>${value}
                                </li>`
                            )}
                        </ul>
                    </div>`
                )}
            </div>`;
    }

    rendered({element}) {
        console.log("Module rendered into element:");
        console.log(element);
        console.log();
    }

})
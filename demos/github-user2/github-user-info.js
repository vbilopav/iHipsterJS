define([], () => class {

    constructor({options}) {
        //
        // when disableCaching option is set to true view will be rendered on every navigate
        //
        options.disableCaching = true;
    }

    async render({params}) {
        return [
            () => String.html`
                <div class="container-fluid">
                    <h3>Github user data</h3>
                    <div class='panel panel-default'>
                        <div class='panel-heading'>${this.value}</div>
                        <div class='panel-body'>
                            <ul>
                            ${async () => this.template.forEach(await _app.fetch("https://api.github.com/users/" + this.value), (key, value) => 
                                String.html`
                                <li class="list-group-item">
                                    <strong>${key}: </strong>${value}
                                </li>`
                            )}
                            </ul>
                        </div>
                    </div>
                    <button onclick="window.history.back();">Go back</button>
                </div>
            `, 
            params
        ]
    }

});

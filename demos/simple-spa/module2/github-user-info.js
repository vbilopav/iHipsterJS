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
                <div>
                    <h2>Github user data</h2>
                    <div>
                        <table>
                        <thead>
                            <tr>
                            <th colspan=2>${this.value}</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${async () => this.template.forEach(await _app.fetch("https://api.github.com/users/" + this.value), (key, value) => 
                            `
                            <tr>
                                <td>${key}</td>
                                <td>${value}</td>
                            </tr>
                            `
                        )}
                        </tbody>
                        </table>
                    </div>
                    <button onclick="window.history.back();">Go back</button>
                </div>
            `, 
            params
        ]
    }

});

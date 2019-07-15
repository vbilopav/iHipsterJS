define([], () => class {

    render({params}) {
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
                        ${async () => this.template.forEach(await ihjs.fetch("https://api.github.com/users/" + this.value), (key, value) => 
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

    rendered(args) {
        console.log("rendered", args);
    }

    revealed(args) {
        console.log("revealed", args);
    }
});

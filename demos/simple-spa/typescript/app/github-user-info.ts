///<reference path="../../../../src/ihjs/build/1.1.1/types/core.d.ts"/>

export default class implements View {
    constructor(args: ViewConstructorArgs) {
        args.options.disableCaching = true;
    }

    async render(args: ViewMethodArgs) {

        let user = args.params.value; // paramsMap has returned plain string instead of object, so it is contained in value field
        let response = await fetch(`https://api.github.com/users/${user}`);
        let result = String.html`
            <div>
                <h2>Github user data</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2>${user}</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (let [key, value] of Object.entries(await response.json())) {
            result += String.html`
                            <tr>
                                <td>${key}</td>
                                <td>${value}</td>
                            </tr>`
        }

        result += String.html`
                        </tbody>
                    </table>
                </div>
                <button onclick="window.history.back();">Go back</button>
            </div>`;

        return result;
    }

};

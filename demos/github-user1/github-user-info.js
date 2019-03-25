define([], () => class {

    constructor({options}) {
        //
        // when disableCaching option is set to true view will be rendered on every navigate
        //
        options.disableCaching = true;
    }

    async render({params}) {
        let user = params.value; // paramsMap has returned plain string instead of object, so it is contained in value field
        let response = await fetch(`https://api.github.com/users/${user}`);
        let result = String.html`
            <div class="container-fluid">
                <h3>Github user data</h3>
                <div class='panel panel-default'>
                    <div class='panel-heading'>${user}</div>
                    <div class='panel-body'>
                        <ul>`;

        for (let [key, value] of Object.entries(await response.json())) {
            result += String.html`
                            <li class="list-group-item">
                                <strong>${key}: </strong>${value}
                            </li>`
        }

        result += String.html`
                        </ul>
                    </div>
                </div>
                <button onclick="window.history.back();">Go back</button>
            </div>
            `
        return result;
    }

});

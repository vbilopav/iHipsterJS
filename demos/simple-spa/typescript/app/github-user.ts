///<reference path="../../../../src/ihjs/build/1.2.6/types/core.d.ts"/>

export default class {
    username: string;
    model: {
        username: HTMLInputElement
    };
    context: {
        username: string
    };

    constructor() {
        this.context = {
            username: window.ihjs.queryString as string || "vbilopav" // default value for the model element username
        }
    }

    render() {
        return String.html`
            <div class="container-fluid">
                <h3>Github user data</h3>
                <input type="text" name="username">
                <button name="show" onclick="showClick">Show github user data</button>
            </div>`;
    }

    showClick() {
        window.location.href = "#/github-user-info/" + this.model.username.value;
    }

};

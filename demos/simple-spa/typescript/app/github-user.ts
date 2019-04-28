///<reference path="../../../../src/ihjs/build/1.0.0/types/core.d.ts"/>

export default class {
    username: string
    model: {
        username: HTMLInputElement
    };

    constructor() {
        this.username = window._app.queryString as string || "vbilopav"; // default value for the model element username
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

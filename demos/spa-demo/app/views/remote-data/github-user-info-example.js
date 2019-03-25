define([], () => class {

    constructor({options}) {
        this.username = "vbilopav"; // default value for the model element username
    }

    render({element}) {
        element.html(
            String.html`
            <p>
                <h3>Github user data</h3>
                <input type="text" name="username">
                <br />
                <button name="show" onclick="showClick">Show github user data</button>
            </p>`
        );
    }

    showClick() {
        window.location = "#/github-user-info/" + this.model.username.value;
    }

});

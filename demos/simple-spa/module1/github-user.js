define([], () => class {

    constructor() {
        this.username = _app.queryString || "vbilopav"; // default value for the model element username
    }

    render() {
        return String.html`
        <div>
            <h1>Github user data</h1>
            <p> 
                <label for="username">Enter valid github username: </label> 
                <input type="text" id="username" autofocus spellcheck="false" onkeypress="e => e.keyCode === 13 && this.model.btn.click()">
                <br />
                <button name="btn" onclick="showClick">Show github user data</button>
            </p>
        </div>`;
    }

    showClick() {
        this.username = this.model.username.value; // model is rebind on reveal
        window.location = "#/github-user-info/" + this.username;
    }

});

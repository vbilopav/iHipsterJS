define([], () => class {

    constructor() {
        this.context = {
            username: ihjs.queryString || "vbilopav" // default value for the model element username
        }
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
        window.location = "#/github-user-info/" + this.model.username.value;
    }

});

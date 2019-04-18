define([], () => class {

    render() {
        return [() =>String.html`
            <div>
                <h1>Github user data</h1>
                <p> 
                    <label for="username">Enter valid github username: </label> 
                    <input label type="text" id="username" autofocus spellcheck="false" value="${this.username}">
                    <br />
                    <button onclick="showClick">Show github user data</button>
                </p>
            </div>`,
            {username: _app.queryString || "vbilopav"}
        ];
    }

    showClick() {
        window.location = "#/github-user-info/" + this.model.username.value;
    }

});
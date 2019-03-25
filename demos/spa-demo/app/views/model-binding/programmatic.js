define([], () => {

    const
        model = new _app.Model({
            name: "name", // when value is string bind will match id or name
            email: e => e.name === "email", // value can be function to test element
            select: e => e.matches("[name=select]"), // so that selector can also be used
            check: "check_id",
            showButton: "showButton"
        });

    return class {

        constructor() {
            // set some initial values
            this.name = "Initial name"
            this.email = "Initial email"
        }

        render() {
            return String.html`
            <div>
                <h3>Model binding support - programmatic</h3>
                <p>
                    Demonstration for programmatic bi-directional model binding support.
                    Programmatic model approach receives already defined model in model contructor.
                    Each model element in definition has value of element id or name (in that order) - or - callback function that can do custom matching.
                    <br />
                    Also demonstrates event binding on view instance.
                    <br /><br />
                    View location: <pre>/app/views/remote-data/model-binding/programmatic.js</pre>
                    <br />
                    <label for="name" style="width: 50px">Name: </label><input name="name" type="text"><br />
                    <label for="email" style="width: 50px">Email: </label><input name="email" type="email"><br />
                    <label for="frameworks">Frameworks: </label>
                    <select name="select">
                        <option value="">select framework ...</option>
                        <option value="Ember">Ember</option>
                        <option value="Angular2">Angular2</option>
                        <option value="Angular">AngularJS</option>
                        <option value="Vue">Vue</option>
                        <option value="Inferno">Inferno</option>
                        <option value="Preact">Preact</option>
                        <option value="React">React</option>
                    </select>
                    <br />
                    <input type="checkbox" name="check" id="check_id" checked>&nbsp;&nbsp;Yes, I might not need those frameworks!<br />
                    <br />
                    <button onclick="showButtonClick">Check model state in console output</button>
                    <hr />
                    <button onclick="set-name-click">Set new value for "name" model propery</button><br /><br />
                    <button onclick="set-email-click">Set new value for "email" model propery</button><br /><br />
                    <button onclick="set-select-click">Set new value for "select" model propery</button><br /><br />
                    <button onclick="set-check-click">Set new value for "check" model propery (true or false)</button><br /><br />
                    <hr />
                </p>
            </div>`
        }

        rendered({element}) {
            model.bind(element, this); // second parameter is binding context and it is this instance
        }

        showButtonClick() {
            console.log("*** current model state ***");
            console.log("model.name.value: " + model.name.value);
            console.log("model.email.value: " + model.email.value);
            console.log("model.select.value: " + model.select.value);
            console.log("model.select.text: " + model.select.text);
            console.log("model.check.checked: " + model.check.checked);
            console.log("----------------------------------------------------------");
        }

        setNameClick() {
            let value = prompt("Please enter new value for model.name", model.name.value);
            if (value != null) {
                // same as model.email.value = value;
                model.name = value;
            }
        };
    
        setEmailClick() {
            let value = prompt("Please enter new value for model.email", model.email.value);
            if (value != null) {
                // same as model.email.value = value;
                model.email = value;
            }
        };
    
        setSelectClick() {
            let value = prompt("Please enter new value for model.select", model.select.value);
            if (value != null) {
                // model.select.value = value doesn't work!?
                model.select = value;
            }
        };
    
        setCheckClick() {
            let value = prompt("Please enter new value for model.check", model.check.checked);
            if (value != null) {
                // same as model.check.checked = value.toLowerCase() === "true";
                model.check = value.toLowerCase() === "true";
            }
        };
    }

});
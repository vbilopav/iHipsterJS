define([], () => {

    const
        model = new _app.Model();

    return  class {
        render() {
            return String.html`
            <div>
                <h3>Model binding support - declarative</h3>
                <p>
                    Demonstration for declarative bi-directional model binding support. 
                    Declarative model binding dynamically creates properties on model, based on your HTML markup.
                    If element has id or name (in that order) - property with sam name (camel cased) will be available on your model.
                    <br />
                    Also demonstrates event binding on view instance. 
                    Element events are binded to methods of this view instances with same name (camel cased), since this reference is passed as binding context (second parameter).
                    <br /><br />
                    View location: <pre>/app/views/model-binding/declarative-view-events.js</pre>
                    <br />
                  
                    <label for="name" style="width: 50px">Name: </label><input name="name" type="text"><br />
                    <label for="email" style="width: 50px">Email: </label><input name="email" type="email"><br />
                    <label for="frameworks">Frameworks: </label>
                    <select name="select">
                        <option value="">select framework ...</option>
                        <option value="Ember">Ember</option>
                        <option value="Angular2">Angular2</option>
                        <option value="AngularJS">AngularJS</option>
                        <option value="Vue">Vue</option>
                        <option value="Inferno">Inferno</option>
                        <option value="Preact">Preact</option>
                        <option value="React">React</option>
                    </select>
                    <br />
                    <input type="checkbox" name="check" checked>&nbsp;&nbsp;Yes, I might not need those frameworks!<br />
                    <br />
                    <button onclick="showButtonClick">Check model state in console output</button>
                    <hr />
                    <button onclick="set-name-click">Set new value for "name" model property</button><br /><br />
                    <button onclick="set-email-click">Set new value for "email" model property</button><br /><br />
                    <button onclick="set-select-click">Set new value for "select" model property</button><br /><br />
                    <button onclick="set-check-click">Set new value for "check" model property (true or false)</button><br /><br />
                    <hr />
                </p>
            </div>`
        }

        rendered({element}) {
            // set some initial values
            this.name = "Initial name"
            this.email = "Initial email"

            //
            // Binds everything inside element argument, creates properties on model, first by name, then by id 
            // If name and id don't exist it will be skipped.
            // Binds events also with data-event-eventname
            // Second parameter is binding context which is set to this
            model.bind(element, this);
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
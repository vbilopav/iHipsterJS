define([], () => class {

    constructor() {
        this.model = new _app.Model();
        this.text = "initial text";
    }

    render() {
        return String.html`
        <p>
            <h3>Declarative binding</h3>
            <input type="text" name="text">
            <input type="checkbox" name="check" checked>
            <br />
            <button name="showButton" onclick="showButtonClick">Check model</button>
        </p>`;
    }

    rendered({element}) {
        this.model.bind(element, this);
    }

    showButtonClick() {
        console.log("*** current model state ***");
        console.log("model.name.value: " + this.model.text.value);
        console.log("model.email.value: " + this.model.check.checked);
        console.log("----------------------------------------------------------");
    }

});

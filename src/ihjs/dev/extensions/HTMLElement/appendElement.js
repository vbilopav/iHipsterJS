define(["ihjs/models/test-proto"], test => {

    test(HTMLElement, ["appendElement"]);

    HTMLElement.prototype.appendElement = function(e) {
        this.appendChild(e);
        return this;
    }
});
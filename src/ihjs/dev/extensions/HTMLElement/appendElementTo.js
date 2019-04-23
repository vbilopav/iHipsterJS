define(["$/models/test-proto"], test => {

    test(HTMLElement, ["appendElementTo"]);

    HTMLElement.prototype.appendElementTo = function(e) {
        e.append(this);
        return this;
    }
});
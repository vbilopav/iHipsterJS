define(["ihjs/models/test-proto"], test => {

    test(HTMLElement, ["removeAttr"]);

    HTMLElement.prototype.removeAttr = function(key) {
        this.removeAttribute(key);
        return this;
    }
});
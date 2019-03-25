define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["attr"]);

    HTMLElement.prototype.attr = function(key, value) {
        if (value === undefined) {
            return this.getAttribute(key);
        }
        this.setAttribute(key, value);
        return this;
    }
});
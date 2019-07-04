define(["ihjs/models/test-proto"], test => {

    test(HTMLElement, ["attr"]);

    HTMLElement.prototype.attr = function(key, value, toggle) {
        if (value === undefined) {
            return this.getAttribute(key);
        }
        if (toggle === false) {
            this.removeAttribute(key);
        } else {
            this.setAttribute(key, value);
        }
        return this;
    }
});
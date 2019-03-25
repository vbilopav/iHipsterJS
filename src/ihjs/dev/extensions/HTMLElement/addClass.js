define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["addClass"]);

    HTMLElement.prototype.addClass = function(className) {
        if (this.classList) {
            this.classList.add(className);
        } else {
            this.className += ` ${className}`;
        }
        return this;
    }
});
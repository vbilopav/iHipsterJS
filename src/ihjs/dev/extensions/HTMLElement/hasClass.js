define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["hasClass"]);

    HTMLElement.prototype.hasClass = function(className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return new RegExp(`(^| )${className}( |$)`, "gi").test(this.className);
        }
    }
});
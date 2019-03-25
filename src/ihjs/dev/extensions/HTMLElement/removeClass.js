define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["removeClass"]);

    HTMLElement.prototype.removeClass = function(className) {
        if (this.classList) {
            this.classList.remove(className);
        } else {
            this.className = this.className.replace(
                new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"), " "
            );
        }
        return this;
    }
});
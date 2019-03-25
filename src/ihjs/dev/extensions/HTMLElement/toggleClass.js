define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["toggleClass"]);

    HTMLElement.prototype.toggleClass = function(className, state) {
        if (state !== undefined) {
            if (!state) {
                this.removeClass(className);
            } else {
                this.addClass(className);
            }
            return this;
        }
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
        return this;
    }
});
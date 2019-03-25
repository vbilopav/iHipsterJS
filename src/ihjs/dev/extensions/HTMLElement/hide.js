define(["sys/models/test-proto", "sys/extensions/HTMLElement/css"], test => {
        
    test(HTMLElement, ["hide"]);

    HTMLElement.prototype.hide = function() {
        this.css("display", "none");
        return this;
    }
});
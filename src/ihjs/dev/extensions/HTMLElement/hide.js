define(["$/models/test-proto", "$/extensions/HTMLElement/css"], test => {
        
    test(HTMLElement, ["hide"]);

    HTMLElement.prototype.hide = function() {
        this.css("display", "none");
        return this;
    }
});
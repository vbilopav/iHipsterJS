define(["$/models/test-proto", "$/extensions/HTMLElement/css"], test => {
        
    test(HTMLElement, ["hideElement"]);

    HTMLElement.prototype.hideElement = function() {
        this.css("display", "none");
        return this;
    }
});
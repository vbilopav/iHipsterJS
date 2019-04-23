define(["$/models/test-proto", "$/extensions/HTMLElement/css"], test => {
        
    test(HTMLElement, ["showElement"]);

    HTMLElement.prototype.showElement = function(state) {
        if (state !== undefined) {
            if (!state) {
                return this.hideElement();
            }
        }
        this.css("display", "");
        return this;
    }
});
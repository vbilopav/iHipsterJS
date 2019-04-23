define(["$/models/test-proto"], test => {

    test(HTMLElement, ["dataAttr", "_data"]);
    
    HTMLElement.prototype.dataAttr = function(key, value) {
        if (!this._data) {
            this._data = Object.assign({}, this.dataset);
        }
        if (value !== undefined) {
            this._data[key] = value;
            return this;
        }
        return this._data[key];
    }
});
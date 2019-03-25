define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["data", "_data"]);
    
    HTMLElement.prototype.data = function(key, value) {
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
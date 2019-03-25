define(["sys/models/test-proto", "sys/extensions/String/toCamelCase"], test => {
        
    test(HTMLElement, ["css", "_styles"]);

    HTMLElement.prototype.css = function(property, value) {
        if (!this._styles) {
            this._styles = {};
            const styles = window.getComputedStyle(this);
            for(let style in styles) {
                if (styles.hasOwnProperty(style)) {
                    if (!isNaN(style)) {
                        continue;
                    }
                    this._styles[style] = styles[style];
                }
            }
        }
        if (value !== undefined) {
            this._styles[property] = value;
            this.style[property] = value;
            return this;
        }
        const result = this._styles[property];
        if (result === undefined) {
            return this._styles[property.toCamelCase()];
        }
        return result;
    }
});
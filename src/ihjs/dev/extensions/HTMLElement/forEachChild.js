define(["ihjs/models/test-proto"], test => {

    test(HTMLElement, ["forEachChild"]);

    HTMLElement.prototype.forEachChild = function(callback=()=>{}, callFirst=false) {
        if (callFirst) {
            callback(this);
        }
        for(let i = 0, l = this.children.length; i < l; i++) {
            let e = this.children[i];
            if (!e) {
                return this;
            };
            if (e.children.length) {
                e.forEachChild(callback, true);
            } else {
                callback(e);
            }
        }
        return this;
    }
});
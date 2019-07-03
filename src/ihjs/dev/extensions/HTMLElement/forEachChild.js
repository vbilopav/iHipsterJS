define(["ihjs/models/test-proto"], test => {

    test(HTMLElement, ["forEachChild"]);

    HTMLElement.prototype.forEachChild = function(callback=()=>{}, callFirst=false) {
        if (callFirst) {
            callback(this);
        }
        for(let i = 0, l = this.children.length; i < l; i++) {
            if (!this.children[i]) {
                return this;
            }
            this.children[i].forEachChild(callback, true);
        }
        return this;
    }
});
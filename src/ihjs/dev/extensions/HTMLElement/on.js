define(["sys/models/test-proto"], test => {
        
    test(HTMLElement, ["on"]);

    HTMLElement.prototype.on = function(eventName, eventHandler) {
        for(let e of eventName.split(" ")) {
            this.addEventListener(e, eventHandler);
        }
        return this;
    }
});
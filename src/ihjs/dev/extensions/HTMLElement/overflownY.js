define(["sys/models/test-proto"], test => {

    test(HTMLElement, ["overflownY"]);

    HTMLElement.prototype.overflownY = function() {
        return this.scrollHeight > this.clientHeight;
    }
});
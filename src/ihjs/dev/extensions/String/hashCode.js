define(["sys/models/test-proto"], test => {

    test(String, ["hashCode"]);

    String.prototype.hashCode = function() {
        let h = 0;
        for (let i = 0, len = this.length; i < len; i++) {
            let c = this.charCodeAt(i);
            h = ((h<<5)-h)+c;
            h = h & h;
        }
        return h;
    }
});
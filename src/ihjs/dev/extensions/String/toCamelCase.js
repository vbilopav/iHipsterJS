define(["sys/models/test-proto"], test => {
        
    test(String, ["toCamelCase"]);

    String.prototype.toCamelCase = function() {
        return this.replace(/-([a-z,0-9])/g, g => g[1].toUpperCase());
    }
});
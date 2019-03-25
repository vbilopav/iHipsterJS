define(["sys/template/html", "sys/models/test-proto"], (html, test) => {

    test(String, ["createElement"]);

    String.prototype.createElement = function(id, content) {
        return html.tagToElement(this, id, content);
    }
});
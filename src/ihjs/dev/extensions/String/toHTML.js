define(["sys/template/html", "sys/models/test-proto"], (html, test) => {

    test(String, ["toHTML"]);

    String.prototype.toHTML = function() {
        return html.strToElement(this);
    }
});
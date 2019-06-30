define(["ihjs/template/html", "ihjs/models/test-proto"], (html, test) => {

    test(String, ["dom"]);

    String.prototype.dom = function() {
        return html.strToElement(this);
    }
});
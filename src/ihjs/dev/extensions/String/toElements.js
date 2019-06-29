define(["ihjs/template/html", "ihjs/models/test-proto"], (html, test) => {

    test(String, ["toElements"]);

    String.prototype.toElements = function() {
        return html.strToElement(this);
    }
});
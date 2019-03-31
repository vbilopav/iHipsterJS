define([
    "sys/template/parser", 
    "sys/template/import", 
    "sys/template/tags",
], (
    parser, 
    importParser,
    tagsParser
) => {

    return {
        load(name, req, onload) {
            req(["text!" + name], text => {
                importParser.parseImportsAsync(text).then(() => {
                    onload(() => (data, locale) => parser.parseTemplate(tagsParser.parse(text), data, locale, name));
                });
            });
        }
    };

});

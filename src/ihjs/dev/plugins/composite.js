define([
    "$/template/parser", 
    "$/template/import",
    "$/template/tags",
], (
    parser, 
    importParser,
    tagsParser
) => {

    return {
        load(name, req, onload) {
            req(["$text!" + name], text => 
            importParser.parseImportsAsync(text).then(() => 
                    onload(() => (data, locale) => parser.parseComposite(tagsParser.parse(text), data, locale, name))));
        }
    };

});

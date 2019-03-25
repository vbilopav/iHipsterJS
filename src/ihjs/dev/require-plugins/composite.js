define([
    "module", 
    "sys/template/parser", 
    "sys/template/import",
    "sys/template/tags",
], (
    _, 
    parser, 
    importParser,
    tagsParser
) => {

    return {
        version: '1.0.0',
        load(name, req, onload) {
            req(["text!" + name], text => 
            importParser.parseImportsAsync(text).then(() => 
                    onload((data, locale) => parser.parseComposite(tagsParser.parse(text), data, locale, name))));
        }
    };

});

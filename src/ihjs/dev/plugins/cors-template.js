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
            fetch(req.toUrl(name), {mode: "cors"}).then(
                response => response.text()
            ).then(
                response => 
                    importParser.parseImportsAsync(response).then(() => onload(() => (data, locale) => parser.parseTemplate(tagsParser.parse(text), data, locale, name)))
            );
        }
    };

});

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
            fetch(req.toUrl(name), {mode: "cors"}).then(
                response => response.text()
            ).then(
                response => 
                    importParser.parseImportsAsync(response).then(() => onload((data, locale) => parser.parseTemplate(tagsParser.parse(text), data, locale, name)))
            );
        }
    };

});

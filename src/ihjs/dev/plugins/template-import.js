define(["ihjs/template/load-text", "ihjs/template/import", "ihjs/template/parser"], ({loadText}, importParser, parser) => {
    
    return {
        load(name, req, onload) {
            loadText(name, req).then(text => importParser.parseImportsAsync(text).then(() => onload(() => parser.parseComposite(text))));
        }
    };

});

define(["ihjs/template/load-text", "ihjs/template/import", "ihjs/template/parser"], (load, importParser, parser) => {
    
    return {
        load(name, req, onload) {
            load(name, req).then(text => importParser.parseImportsAsync(text).then(() => 
                onload(() => (data, locale) => parser.parseComposite(text, data, locale, name))));
            
        }
    };

});

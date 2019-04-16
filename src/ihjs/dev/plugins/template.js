define(["$/template/load-text", "$/template/import", "$/template/parser"], (load, importParser, parser) => {
    
    return {
        load(name, req, onload) {
            load(name, req).then(text => {
                importParser.parseImportsAsync(text).then(() => {
                    onload(() => (data, locale) => parser.parseTemplate(text, data, locale, name));
                });
            })
        }
    };

});

define(["$/template/load-text", "$/template/import", "$/template/parser"], ({loadText}, importParser, parser) => {
    
    return {
        load(name, req, onload) {
            loadText(name, req).then(text => {
                importParser.parseImportsAsync(text).then(() => {
                    onload(() => (data, locale) => parser.parseTemplate(text, data, locale, name));
                });
            })
        }
    };

});

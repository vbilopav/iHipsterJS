define(["ihjs/template/load-text", "ihjs/template/import", "ihjs/template/parser"], ({loadText}, importParser, parser) => {
    
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

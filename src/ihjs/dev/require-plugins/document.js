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
            const e = document.getElementById(name) || document.getElementsByName(name);
            if (!e || (e.length && e.length === 0)) {
                throw new Error(`Element ${name} couldn't be found!`);
            }
            const textarea = "textarea".createElement();
            textarea.html(e.html());
            const text = textarea.innerText;
            e.remove();
            importParser.parseImportsAsync(text).then(
                () => onload((data, locale) => parser.parseTemplate(tagsParser.parse(text), data, locale, name))
            );
        }
    };

});

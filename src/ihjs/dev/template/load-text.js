
define(["$/template/tags"], tagsParser => (name, req) => new Promise((resolve, reject) => {

    const t = _app.config.__templates && _app.config.__templates.get(name);
    if (t) {
        const textarea = "textarea".createElement();
        textarea.html(t);
        const text = textarea.innerText;
        resolve(tagsParser.parse(text));
        return;
    }
    const e = document.getElementById(name) || document.getElementsByName(name) || _app.config.__templates.namedItem(name);
    if (!e || (e.length !== undefined && e.length === 0)) {
        req(["$text!" + name], text => resolve(tagsParser.parse(text)));
        return;
    }
    const textarea = "textarea".createElement();
    textarea.html(e.html());
    const text = textarea.innerText;
    e.remove();
    resolve(tagsParser.parse(text));

}));

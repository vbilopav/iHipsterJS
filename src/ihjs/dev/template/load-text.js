
define(["$/template/tags"], tagsParser => (name, req) => new Promise((resolve, reject) => {

    const e = document.getElementById(name) || document.getElementsByName(name);
    if (!e || (e.length !== undefined && e.length === 0)) {
        req(["$text!" + name], text => {
            resolve(tagsParser.parse(text));
        }, error => reject(error));
        return;
    }
    const textarea = "textarea".createElement();
    textarea.html(e.html());
    const text = textarea.innerText;
    e.remove();
    resolve(tagsParser.parse(text));

}));

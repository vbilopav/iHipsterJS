
define(["$/template/tags"], tagsParser => {

    const getTemplate = (name, element) => {
        const t = _app.config.__templates && _app.config.__templates.get(name);
        if (t) {
            setTimeout(()=> _app.config.__templates.delete("todo-item"), 0);
            const textarea = "textarea".createElement();
            return {
                html: tagsParser.parse(textarea.html(t.html).innerText),
                data: t.data
            }
        }
        const e = element || document.getElementById(name) || document.getElementsByName(name);
        if (!e || (e.length !== undefined && e.length === 0)) {
            return;
        }
        setTimeout(()=> e.remove(), 0);
        const textarea = "textarea".createElement();
        return {
            html: tagsParser.parse(textarea.html(e.html()).innerText),
            data: e.dataset
        }
    };

    return {
        getTemplate,
        loadText(name, req) {
            return new Promise(resolve => {
                const t = getTemplate(name);
                if (!t) {
                    req(["$text!" + name], text => resolve(tagsParser.parse(text)));
                    return;
                }
                resolve(t.html);
            });
        } 
    }
});


define(["ihjs/template/tags"], tagsParser => {

    const getTemplate = (name, element) => {
        const t = ihjs.config.__templates && ihjs.config.__templates.get(name);
        if (t) {
            setTimeout(()=> ihjs.config.__templates.delete("todo-item"), 0);
            const textarea = "textarea".createElement();
            return {
                html: tagsParser.parse(textarea.html(t.html).innerText),
                data: t.data
            }
        }
        let e = element || document.getElementById(name) || document.getElementsByName(name);
        if (e[0]) {
            e = e[0];
        }
        if (!e || (e.length !== undefined && e.length === 0)) {
            return;
        }
        let textarea = "textarea".createElement();
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
                    req(["text!" + name], text => resolve(tagsParser.parse(text)));
                    return;
                }
                resolve(t.html);
            });
        } 
    }
});

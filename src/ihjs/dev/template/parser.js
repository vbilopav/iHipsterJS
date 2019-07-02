define([
    "ihjs/template/helpers", 
    "ihjs/template/import",
    "ihjs/app"
], (
    helpers, 
    importParser,
    app
) => {

    app.template = (pieces, ...subs) => {
        return (async () => {
            for(let i = 0, l = subs.length; i < l; i++) {
                let sub = subs[i];
                if (typeof sub === "function") {
                    let result = sub();
                    sub = result === undefined || typeof result === "function" ? "" : result;
                    subs[i] = sub;
                }
                if (sub instanceof Promise) {
                    let result = await sub;
                    if (typeof sub === "function") {
                        result = sub();
                        if (result instanceof Promise) {
                            result = await result;
                        }
                    }
                    sub = result === undefined || typeof result === "function" ? "" : result;
                    subs[i] = sub;
                }
                if (sub === undefined || typeof sub === "object") {
                    subs[i] = "";
                }
            }
            return String.raw(pieces, ...subs);
        })();
    };

    app.composite = (_, ...subs) => subs;

    const
        prepareTemplate = (data, name, locale) => {
            data = data || {};
            data.template = Object.assign(data.template || {}, helpers());
            if (locale) {
                data.template = Object.assign(data.template, locale);
            }
            data.template.name = name;
            return data;
        },
        parseTemplate = (text, data, locale, name) => 
            new Function("return " + app.config.name + ".template`" + text + "`;").call(prepareTemplate(data, name, locale)),
        parseComposite = (text, data, locale, name) => 
            new Function("return " + app.config.name + ".composite`" + text + "`;").call(prepareTemplate(data, name, locale));

    app.parse = async (template, data, locale, name) => {
        let text;
        if (typeof template === "string") {
            text = template;
        } else {
            text = template.toString();
            let index = text.indexOf("`", 0);
            if (index === -1) {
                throw new Error("Invalid template");
            }
            text =  text.substring(index+1, text.lastIndexOf("`"));
        }
        await importParser.parseImportsAsync(text);
        return await parseTemplate(text, data, locale, name);
    };

    return {
        parseTemplate: parseTemplate,
        parseComposite: parseComposite,
    }
});

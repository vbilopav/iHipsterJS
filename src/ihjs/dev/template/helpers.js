define(["ihjs/template/css"], cssHelper => {
    
    const 
        cssImported = cssHelper.getImported();

    return function() {
        return {
            forEach: (obj, template) => {
                if (obj.next) {
                    let result = "";
                    for (let i of obj) {
                        result = result.concat(template(...i));
                    }
                    return result;
                } else {
                    return (obj instanceof Array ? obj : Object.entries(obj || {})).map((item, index) => template(...(item instanceof Array ? item : [item]), index)).join("");
                }
            },
    
            import: name => require(name),

            css: async (...names) => {
                if (!cssHelper.shouldLoad()) {
                    return;
                }
                let links = [], texts = [];
                names.forEach(l => {
                    if (cssImported.includes(l)) {
                        return;
                    }
                    if (!l.startsWith("text!")) {
                        links.push(cssHelper.addLink(l));
                    } else {
                        texts.push(l);
                    }
                    cssImported.push(l);
                });
                await Promise.all(links);
                if (texts.length) {
                    await new Promise(resolve => require(texts, (...results) => {
                        cssHelper.addContent(results);
                        return resolve();
                    }));
                }
            },

            if: (condition, templateTrue, templateFalse) => (condition ? templateTrue : templateFalse),
        }
    }

});

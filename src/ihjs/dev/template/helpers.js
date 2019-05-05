define(["$/template/css"], cssHelper => {
    
    const 
        cssImported = cssHelper.getImported();

    return function() {
        return {
            forEach: (obj, template) => (obj instanceof Array ? obj : Object.entries(obj || {})).map(
                (item, index) => template(...(item instanceof Array ? item : [item]), index)
            ).join(""),
    
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
                    if (!l.startsWith("$text!")) {
                        links.push(cssHelper.addLink(l));
                    } else {
                        texts.push(l);
                    }
                    cssImported.push(l);
                });
                await Promise.all(links);
                if (texts.length) {
                    await new Promise(resolve => require(texts, (...results) => {
                        cssHelper.addContet(results);
                        return resolve();
                    }));
                }
            },
/*
            css: {
                import: (...names) => {
                    if (!cssHelper.shouldLoad()) {
                        return;
                    }
                    let items = names.filter(value => !cssImported.includes(value));
                    if (!items.length) {
                        return;
                    }
                    cssHelper.addContet(items.map(item => require(item.startsWith("$text!") ? item : "$text!" + item)));
                    items.map(item => cssImported.push(item));
                },
                link: (...names) => {
                    if (!cssHelper.shouldLoad()) {
                        return;
                    }
                    let items = names.filter(value => !cssImported.includes(value));
                    if (!items.length) {
                        return;
                    }
                    items.map(item => {
                        cssHelper.addLink(item); 
                        cssImported.push(item);
                    });
                }
            },
*/
            if: (condition, templateTrue, templateFalse) => (condition ? templateTrue : templateFalse),
        }
    }

});

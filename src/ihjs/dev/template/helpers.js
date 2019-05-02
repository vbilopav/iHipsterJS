define(["$/template/css"], cssHelper => {
    
    const 
        cssImported = cssHelper.getImported();

    return function() {
        return {
            forEach: (obj, template) => (obj instanceof Array ? obj : Object.entries(obj || {})).map(
                (item, index) => template(...(item instanceof Array ? item : [item]), index)
            ).join(""),
    
            import: name => require(name),
    
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
    
            if: (condition, templateTrue, templateFalse) => (condition ? templateTrue : templateFalse),
        }
    }

});

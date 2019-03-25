define([], () => {

    const cssImported = [];

    return function() {
        return {
            forEach: (obj, template) => (obj instanceof Array ? obj : Object.entries(obj || {})).map(
                (item, index) => template(...(item instanceof Array ? item : [item]), index)
            ).join(""),
    
            import: name => require(name),
    
            css: {
                import: (...names) => {
                    let items = names.filter(value => !cssImported.includes(value));
                    if (!items.length) {
                        return;
                    }
                    document.head.appendChild(
                        `<style type="text/css">
                            ${items.map(item => require(item.startsWith("text!") ? item : "text!" + item)).join("")}
                        </style>`.toHTML()
                    )
                    items.map(item => cssImported.push(item));
                }
            },
    
            if: (condition, templateTrue, templateFalse) => (condition ? templateTrue : templateFalse),
        }
    }

});

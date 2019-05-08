define(["$/app"], app => {

    app.customElements = {
        _components: [],
        _define: ({tag, src, wrap}) => {
            if (!wrap) {
                wrap = tag;
            }
            let idx = tag.indexOf("-");
            if (idx === -1 || idx === 0 || idx === tag.length-1) {
                throw new Error("Invalid tag name. Tags names should include at least one dash, not on start or end of tag name.") 
            }
            app.customElements._components[tag.toUpperCase()] = {
                src: src,
                wrap: wrap
            }
        },
        define: (...args) => new Promise((resolve, reject) => {
            let items = {};
            for(let arg of args) {
                items[arg.src] = arg;
            }
            require(Object.keys(items), (...results) => {
                const resolved = [];
                for(let i = 0, l = results.length; i < l; i++) {
                    let item = args[i], res = results[i];
                    if (res.prototype instanceof HTMLElement || (res.default && res.default.prototype instanceof HTMLElement)) {
                        if (!window.customElements) {
                            reject("customElements not supported")
                        }
                        window.customElements.define(item.tag, res.default || res, item.options);
                        resolved.push(item);
                    } else {
                        app.customElements._define(item);
                        resolved.push(item);
                    }
                }
                if (resolved.length) {
                    return resolve(resolved);
                }
                return reject(resolved);
            });
        })
    }
    
    return {
        getTags: () => Object.keys(app.customElements._components),
        getEntry: name => app.customElements._components[name.toUpperCase()]
    }

});

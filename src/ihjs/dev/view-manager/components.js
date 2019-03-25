define(["sys/app"], app => {

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
        define: (...args) => {
            for(let arg of args) {
                app.customElements._define(arg);
            }
            return app.customElements;
        }
    }
    
    return {
        getTags: () => Object.keys(app.customElements._components),
        getEntry: name => app.customElements._components[name.toUpperCase()]
    }

 });

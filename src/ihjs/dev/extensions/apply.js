define(["ihjs/models/test-proto"], test => {
    
    let 
        loaded,

        applyExtension = (element, extension, isArray=false) => {
            if (typeof element === "string") {
                element = window[element];
            } else {
                element = element
            }
            test(element, [extension]);
            if (element === "NodeList" || element === "HTMLCollection" || isArray) {
                element.prototype[extension] = function(...args) {
                    for(let e of this) {
                        e[extension](...args);
                    }
                    return this;
                }
            } else {
                element.prototype[extension] = HTMLElement.prototype[extension];
            }
        },

        applyExtensions = (element, extensions, isArray=false) => {
            for(let extension of extensions) {
                applyExtension(element, extension, isArray)
            }
        },

        applyAllExtensions = (element, segment, isArray=false) => {
            applyExtensions(element, loaded[segment], isArray)
        },

        applyExtensionsExcept = (element, segment, except, isArray=false) => {
            applyExtensions(element, loaded[segment].filter(i => !except.includes(i)), isArray)
        }

    return {
        loadExtensions(list) {
            let modules = [];
            for (let [key, value] of Object.entries(list)) {
                modules.push(...value.map(v => "ihjs/extensions/" + key + "/" + v));
            }
            return new Promise(resolve => require(modules, () => {
                loaded = Object.assign(loaded || {}, list);
                resolve();
            }))
        },
        applyExtensions,
        applyAllExtensions,
        applyExtensionsExcept
    };

});

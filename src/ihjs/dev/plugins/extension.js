define(["sys/models/test-proto"], test => {
    
    const 
        applyExtension = (element, extension) => {
            if (element == "NodeList") {
                test(NodeList, [extension]);
                NodeList.prototype[extension] = function(...args) {
                    for(let e of this) {
                        e[extension](...args);
                    }
                    return this;
                }
            } else {
                test(window[element], [extension]);
                window[element].prototype[extension] = HTMLElement.prototype[extension];
            }
        };

    return {
        load(name, req, onload) {
            const 
                [elementName, extensionName] = name.split("/");
            if (!["NodeList", "Document", "Window"].includes(elementName)) {
                throw new Error(`"${name}" is not valid element for extension!`);
            }
            if (!window[elementName].prototype[extensionName]) {
                req(["sys/extensions/HTMLElement/" + extensionName], () => {
                    if (!window[elementName].prototype[extensionName]) {
                        applyExtension(elementName, extensionName);
                    }
                    onload();
                });
            } else {
                applyExtension(elementName, extensionName);
                onload();
            }
        }
    };

});
